#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { platform } from 'os';
import net from 'net';

const isWindows = platform() === 'win32';

function log(message) {
    process.stdout.write(message + '\n');
}

// Get list of Node processes synchronously
function getNodeProcesses() {
    try {
        const cmd = isWindows
            ? 'wmic process where name="node.exe" get processid /format:csv'
            : 'ps -e | grep node';

        const stdout = execSync(cmd, { encoding: 'utf8' });
        const lines = stdout.toString().split('\n');
        const currentPid = process.pid;
        const parentPid = process.ppid;

        // Parse PIDs from output
        return lines
            .map(line => {
                if (isWindows) {
                    const match = line.match(/,(\d+)/);
                    return match ? parseInt(match[1]) : null;
                } else {
                    const parts = line.trim().split(/\s+/);
                    return parts[0] ? parseInt(parts[0]) : null;
                }
            })
            .filter(pid =>
                pid &&
                !isNaN(pid) &&
                pid !== currentPid &&
                pid !== parentPid &&
                pid > 1000
            );
    } catch (error) {
        log('No Node.js processes found');
        return [];
    }
}

// Kill a process synchronously
function killProcess(pid) {
    try {
        const cmd = isWindows ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`;
        execSync(cmd, { encoding: 'utf8' });
        log(`Process ${pid} stopped successfully`);
    } catch (error) {
        log(`Could not stop process ${pid}`);
    }
}

// Check if port is available synchronously
function checkPort(port) {
    try {
        const server = net.createServer();
        let available = false;

        server.on('error', () => {
            available = false;
        });

        server.listen(port, '0.0.0.0');
        server.close();
        available = true;

        return available;
    } catch (error) {
        return false;
    }
}

// Find available port
function findAvailablePort(startPort = 8000, endPort = 8100) {
    log(`Looking for available port between ${startPort} and ${endPort}...`);

    for (let port = startPort; port <= endPort; port++) {
        if (checkPort(port)) {
            log(`Found available port: ${port}`);
            return port;
        }
    }

    throw new Error('No available ports found');
}

// Sleep synchronously
function sleep(seconds) {
    const start = Date.now();
    while (Date.now() - start < seconds * 1000) {
        // Busy wait
    }
}

// Main setup function
function setup() {
    try {
        // Cleanup
        log('\n=== Running Cleanup ===');
        const pids = getNodeProcesses();

        if (pids.length === 0) {
            log('No Node.js processes to clean up');
        } else {
            log(`Found ${pids.length} Node.js processes to clean up`);
            for (const pid of pids) {
                log(`Stopping process ${pid}`);
                killProcess(pid);
                sleep(0.1); // Small delay between kills
            }
        }
        log('Cleanup complete\n');

        // Wait for processes to settle
        log('=== Waiting for Processes to Settle ===');
        log('Waiting for 2 seconds...');
        sleep(2);
        log('Done waiting\n');

        // Find available port
        log('=== Setting Up Port Configuration ===');
        const port = findAvailablePort();
        const config = `VITE_API_URL=http://localhost:${port}/api`;
        writeFileSync('.env.local', config);
        log(config + '\n');

        log('=== Setup Complete ===\n');
        process.exit(0);
    } catch (error) {
        log('\nSetup failed:');
        console.error(error);
        process.exit(1);
    }
}

// Run setup
setup(); 
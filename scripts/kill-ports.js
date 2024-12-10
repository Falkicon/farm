#!/usr/bin/env node

import { execSync } from 'child_process';
import { platform } from 'os';
import net from 'net';

const isWindows = platform() === 'win32';
const ports = [3000, 8000]; // Frontend and backend ports

console.log('[PORTS] Checking:', ports.join(', '));

async function isPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer()
            .once('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .once('listening', () => {
                server.once('close', () => resolve(false));
                server.close();
            })
            .listen(port);
    });
}

async function killProcessOnPort(port) {
    try {
        if (!(await isPortInUse(port))) {
            console.log(`[INFO] Port ${port} is not in use`);
            return;
        }

        const cmd = isWindows
            ? `powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort ${port}).OwningProcess -Force"`
            : `lsof -ti:${port} | xargs -r kill -9`;

        execSync(cmd, { stdio: 'pipe' });
        console.log(`[SUCCESS] Cleared port ${port}`);
    } catch (error) {
        if (!error.message.includes('no process found') && !error.message.includes('not found')) {
            console.error(`[ERROR] Failed to clear port ${port}:`, error.message);
        } else {
            console.log(`[INFO] No process found on port ${port}`);
        }
    }
}

// Run checks and kill processes
Promise.all(ports.map(killProcessOnPort))
    .then(() => console.log('[DONE] Port check complete'))
    .catch(error => {
        console.error('[ERROR] Failed to check ports:', error);
        process.exit(1);
    });
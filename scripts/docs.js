#!/usr/bin/env node

import { spawn } from 'child_process';
import { platform } from 'os';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';

const isWindows = platform() === 'win32';
const pythonCmd = isWindows ? 'python' : 'python3';

const commands = {
  serve: {
    cmd: ['-m', 'mkdocs', 'serve'],
    description: 'Start the documentation server (MkDocs)',
    type: 'mkdocs'
  },
  build: {
    cmd: ['-m', 'mkdocs', 'build'],
    description: 'Build the documentation (MkDocs)',
    type: 'mkdocs'
  },
  deploy: {
    cmd: ['-m', 'mkdocs', 'gh-deploy'],
    description: 'Deploy to GitHub Pages (MkDocs)',
    type: 'mkdocs'
  },
  clean: {
    cmd: null, // Handled separately
    description: 'Clean the documentation build',
    type: 'both'
  },
  'api:serve': {
    cmd: ['typedoc', '--watch', '--out', 'docs/api'],
    description: 'Start the API documentation server (TypeDoc)',
    type: 'typedoc'
  },
  'api:build': {
    cmd: ['typedoc', '--out', 'docs/api'],
    description: 'Build the API documentation (TypeDoc)',
    type: 'typedoc'
  }
};

function showHelp() {
  console.log(`
Documentation Management Script

Usage:
  npm run docs [command]

MkDocs Commands (Project Documentation):
  serve     - ${commands.serve.description}
  build     - ${commands.build.description}
  deploy    - ${commands.deploy.description}

TypeDoc Commands (API Documentation):
  api:serve - ${commands['api:serve'].description}
  api:build - ${commands['api:build'].description}

General Commands:
  clean     - ${commands.clean.description}

Examples:
  npm run docs              # Starts the MkDocs server
  npm run docs api:serve    # Starts the TypeDoc server
  npm run docs build        # Builds MkDocs documentation
  npm run docs api:build    # Builds TypeDoc documentation
  npm run docs deploy       # Deploys to GitHub Pages
  `);
}

async function checkPython() {
  return new Promise((resolve) => {
    const check = spawn(pythonCmd, ['--version']);
    check.on('close', (code) => {
      if (code !== 0) {
        console.error('\x1b[31mPython is not installed or not in PATH. Please install Python first.\x1b[0m');
        process.exit(1);
      }
      resolve();
    });
  });
}

async function checkMkDocs() {
  return new Promise((resolve) => {
    const check = spawn(pythonCmd, ['-m', 'mkdocs', '--version']);
    check.on('close', (code) => {
      if (code !== 0) {
        console.log('\x1b[33mMkDocs is not installed. Installing required packages...\x1b[0m');
        const install = spawn(pythonCmd, ['-m', 'pip', 'install', 'mkdocs', 'mkdocs-dracula-theme', 'mkdocs-minify-plugin']);
        install.stdout.pipe(process.stdout);
        install.stderr.pipe(process.stderr);
        install.on('close', (code) => {
          if (code !== 0) {
            console.error('\x1b[31mFailed to install MkDocs.\x1b[0m');
            process.exit(1);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function checkTypeDoc() {
  return new Promise((resolve) => {
    const check = spawn('npx', ['typedoc', '--version']);
    check.on('close', (code) => {
      if (code !== 0) {
        console.log('\x1b[33mTypeDoc is not installed. Installing...\x1b[0m');
        const install = spawn('npm', ['install', '--save-dev', 'typedoc']);
        install.stdout.pipe(process.stdout);
        install.stderr.pipe(process.stderr);
        install.on('close', (code) => {
          if (code !== 0) {
            console.error('\x1b[31mFailed to install TypeDoc.\x1b[0m');
            process.exit(1);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function clean() {
  const paths = ['site', 'docs/api'].map(p => join(process.cwd(), p));

  for (const path of paths) {
    if (existsSync(path)) {
      try {
        await rm(path, { recursive: true, force: true });
        console.log(`\x1b[32mCleaned ${path}\x1b[0m`);
      } catch (error) {
        console.error(`\x1b[31mFailed to clean ${path}:\x1b[0m`, error);
        process.exit(1);
      }
    }
  }
  console.log('\x1b[32mAll documentation builds cleaned.\x1b[0m');
}

async function runCommand(command = 'serve') {
  if (command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (!commands[command]) {
    console.error(`\x1b[31mUnknown command: ${command}\x1b[0m`);
    showHelp();
    process.exit(1);
  }

  const cmd = commands[command];

  // Check dependencies based on command type
  if (cmd.type === 'mkdocs' || cmd.type === 'both') {
    await checkPython();
    await checkMkDocs();
  }
  if (cmd.type === 'typedoc' || cmd.type === 'both') {
    await checkTypeDoc();
  }

  if (command === 'clean') {
    await clean();
    return;
  }

  console.log(`\x1b[32m${cmd.description}...\x1b[0m`);

  const execCmd = cmd.type === 'typedoc' ? 'npx' : pythonCmd;
  const args = cmd.type === 'typedoc' ? cmd.cmd : cmd.cmd;

  const proc = spawn(execCmd, args, { stdio: 'inherit' });

  proc.on('error', (error) => {
    console.error('\x1b[31mFailed to execute command:\x1b[0m', error);
    process.exit(1);
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`\x1b[31mCommand failed with code ${code}\x1b[0m`);
      process.exit(code);
    }
  });
}

// Get command from command line arguments
const command = process.argv[2] || 'serve';
runCommand(command).catch((error) => {
  console.error('\x1b[31mAn error occurred:\x1b[0m', error);
  process.exit(1);
});

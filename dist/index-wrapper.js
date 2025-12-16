#!/usr/bin/env node

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageDir = join(__dirname, '..');
const nodeModulesPath = join(packageDir, 'node_modules');
const sdkPath = join(nodeModulesPath, '@modelcontextprotocol', 'sdk');

if (!existsSync(sdkPath)) {
  console.error('[Setup] Installing dependencies...');
  const npm = spawn('npm', ['install'], {
    cwd: packageDir,
    stdio: 'inherit',
    shell: true
  });
  
  npm.on('close', (code) => {
    if (code !== 0) {
      console.error('[Error] Failed to install dependencies');
      process.exit(1);
    }
    import('./index.js');
  });
} else {
  import('./index.js');
}


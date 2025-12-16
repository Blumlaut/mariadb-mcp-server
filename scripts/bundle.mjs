import * as esbuild from 'esbuild';
import { builtinModules } from 'module';

console.log('Building TypeScript sources and bundling dependencies...');

const externalModules = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`)
];

try {
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    platform: 'node',
    target: 'node18',
    format: 'cjs',
    outfile: 'dist/index-bundle.cjs',
    banner: {
      js: '#!/usr/bin/env node',
    },
    treeShaking: true,
    ignoreAnnotations: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    external: externalModules,
    sourcemap: false,
    logLevel: 'info',
    packages: 'bundle',
  });

  console.log('✓ TypeScript compiled and bundled successfully at dist/index-bundle.cjs');
  console.log('✓ All dependencies are included in the bundle');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}



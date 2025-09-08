import { defineConfig } from 'tsup';
import { builtinModules } from 'node:module';

export default defineConfig({
  entry: {
    main: 'electron/main.ts',
    preload: 'electron/preload.ts',
  },
  outDir: 'dist-electron',
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  shims: false,
  external: ['electron', ...builtinModules],
});

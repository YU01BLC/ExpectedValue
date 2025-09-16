import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/renderer/**/*.{ts,tsx}'],
      exclude: [
        'src/renderer/**/*.test.{ts,tsx}',
        'src/renderer/**/*.spec.{ts,tsx}',
        'src/renderer/**/__tests__/**',
        'src/renderer/**/__mocks__/**',
        'src/renderer/**/index.ts',
        'src/renderer/**/index.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer'),
      '@renderer': path.resolve(__dirname, './src/renderer'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
});

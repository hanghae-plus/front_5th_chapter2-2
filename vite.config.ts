import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base: '/front_5th_chapter2-2/',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.refactoring.html'),
        },
      },
      outDir: 'dist',
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }),
);

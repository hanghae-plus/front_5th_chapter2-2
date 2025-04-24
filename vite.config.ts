import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const isCI = process.env.CI === 'true';

export default mergeConfig(
  defineConfig({
    base: isCI ? '' : '/front_5th_chapter2-2/',
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    build: {
      rollupOptions: {
        input: {
          origin: resolve(__dirname, 'index.origin.html'),
          refactoring: resolve(__dirname, 'index.refactoring.html'),
        },
      },
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

import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base:
      process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-2/' : '/',
    build: {
      rollupOptions: {
        input: {
          origin: path.resolve(__dirname, 'index.origin.html'),
          advanced: path.resolve(__dirname, 'index.advanced.html'),
          refactoring: path.resolve(__dirname, 'index.refactoring.html'),
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
  })
);

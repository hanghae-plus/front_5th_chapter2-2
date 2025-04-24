import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base: '/front_5th_chapter2-2/',
    build: {
      outDir: './dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.refactoring.html'),
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts'
    },
  })
)

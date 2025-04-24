import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base: '/front_5th_chapter2-2/',
    build: {
      rollupOptions: {
        input: {
          origin: 'index.origin.html',
          refactoring: 'index.refactoring.html',
        },
        output: {
          entryFileNames: () => {
            return `assets/[name]-[hash].js`;
          },
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

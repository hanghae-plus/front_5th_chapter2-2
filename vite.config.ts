import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig, loadEnv } from 'vite';

import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }: { mode: string }) => {
  const target = mode === 'production' ? 'refactoring' : 'basic';
  const customHtml = `index.${target}.html`;
  const indexHtmlPath = path.resolve(__dirname, 'index.html');
  const backupHtmlPath = path.resolve(__dirname, 'index.original.html');

  if (fs.existsSync(customHtml)) {
    if (fs.existsSync(indexHtmlPath)) {
      fs.copyFileSync(indexHtmlPath, backupHtmlPath);
    }
    fs.copyFileSync(path.resolve(__dirname, customHtml), indexHtmlPath);
    console.log(`[vite] Using ${customHtml} as entry HTML`);
  }

  return mergeConfig(
    defineConfig({
      base: '/front_5th_chapter2-2/',
      plugins: [
        react(),
        {
          name: 'restore-original-index-html',
          closeBundle() {
            if (fs.existsSync(backupHtmlPath)) {
              fs.copyFileSync(backupHtmlPath, indexHtmlPath);
              fs.unlinkSync(backupHtmlPath);
              console.log(
                '[vite] index.html has been restored to original version.',
              );
            }
          },
        },
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/refactoring'),
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
};

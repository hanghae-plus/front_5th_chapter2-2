// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/front_5th_chapter2-2/" : "/";
  
  return {
    base: base,
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['/src/setupTests.js'],
      include: [
        'src/basic/**/*.test.js',
        'src/advanced/**/*.test.js',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }
})
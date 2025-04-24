import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const BASE_PATH = isProd ? "/front_5th_chapter2-2/" : "/";

  return mergeConfig(
    defineConfig({
      base: BASE_PATH,
      plugins: [react()],
      resolve: {
        alias: {
          "@refactoring": path.resolve(__dirname, "src/refactoring"),
        },
      },
      build: {
        rollupOptions: {
          input: {
            "index.origin": path.resolve(__dirname, "index.origin.html"),
            "index.refactoring": path.resolve(__dirname, "index.refactoring.html"),
          },
        },
        outDir: "dist",
      },
    }),

    defineTestConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
      },
    }),
  );
});

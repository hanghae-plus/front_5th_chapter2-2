import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter2-2/" : "/";

export default mergeConfig(
  defineConfig({
    base: BASE_PATH,
    plugins: [react()],

    build: {
      rollupOptions: {
        input: {
          origin: resolve(__dirname, "index.origin.html"),
          refactoring: resolve(__dirname, "index.refactoring.html"),
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  })
);

import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { resolve } from "path";

export default mergeConfig(
  defineConfig({
    build: {
      rollupOptions: {
        input: resolve(__dirname, "index.refactoring.html"),
      },
    },
    base: "/",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@refactoring": path.resolve(__dirname, "./src/refactoring"),
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

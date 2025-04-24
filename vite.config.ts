import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default mergeConfig(
  defineConfig({
    base:
      process.env.NODE_ENV === "production" ? "/front_5th_chapter2-2/" : "/",
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          original: path.resolve(__dirname, "index.origin.html"),
          refactoring: path.resolve(__dirname, "index.refactoring.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@r": path.resolve(__dirname, "src/refactoring"),
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

import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

function createBaseConfig(command: "build" | "serve") {
  return {
    plugins: [react()],
    base: command === "build" ? "/front_5th_chapter2-2/" : undefined,
    build: {
      rollupOptions: {
        input: {
          origin: "./index.origin.html",
          refactoring: "./index.refactoring.html",
        },
      },
    },
  };
}

const testConfig = defineTestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});

export default defineConfig(({ command }) => {
  const baseConfig = createBaseConfig(command);
  return mergeConfig(baseConfig, testConfig);
});

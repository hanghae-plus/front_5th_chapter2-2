import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    base: process.env.NODE_ENV === "production" ? "/front_5th_chapter2-2/" : "",
    plugins: [react()],
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  }),
);

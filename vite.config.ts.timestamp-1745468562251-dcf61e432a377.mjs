// vite.config.ts
import { defineConfig as defineTestConfig, mergeConfig } from "file:///C:/Users/FE/personal/%ED%95%AD%ED%95%B4/front_5th_chapter2-2/node_modules/.pnpm/vitest@2.1.3_@vitest+ui@2.1.3_jsdom@26.1.0/node_modules/vitest/dist/config.js";
import { defineConfig } from "file:///C:/Users/FE/personal/%ED%95%AD%ED%95%B4/front_5th_chapter2-2/node_modules/.pnpm/vite@5.4.9/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/FE/personal/%ED%95%AD%ED%95%B4/front_5th_chapter2-2/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.9/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///C:/Users/FE/personal/%ED%95%AD%ED%95%B4/front_5th_chapter2-2/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.6.3_vite@5.4.9/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = mergeConfig(
  defineConfig({
    plugins: [react(), tsconfigPaths()]
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts"
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxGRVxcXFxwZXJzb25hbFxcXFxcdUQ1NkRcdUQ1NzRcXFxcZnJvbnRfNXRoX2NoYXB0ZXIyLTJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEZFXFxcXHBlcnNvbmFsXFxcXFx1RDU2RFx1RDU3NFxcXFxmcm9udF81dGhfY2hhcHRlcjItMlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRkUvcGVyc29uYWwvJUVEJTk1JUFEJUVEJTk1JUI0L2Zyb250XzV0aF9jaGFwdGVyMi0yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIGFzIGRlZmluZVRlc3RDb25maWcsIG1lcmdlQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxyXG4gIGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpXSxcclxuICB9KSxcclxuICBkZWZpbmVUZXN0Q29uZmlnKHtcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICAgIHNldHVwRmlsZXM6ICcuL3NyYy9zZXR1cFRlc3RzLnRzJ1xyXG4gICAgfSxcclxuICB9KVxyXG4pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1YsU0FBUyxnQkFBZ0Isa0JBQWtCLG1CQUFtQjtBQUNoWixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsYUFBYTtBQUFBLElBQ1gsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUNwQyxDQUFDO0FBQUEsRUFDRCxpQkFBaUI7QUFBQSxJQUNmLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==

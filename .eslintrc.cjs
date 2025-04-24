module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "boundaries", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // ✅ boundaries 플러그인 룰: 레이어 간 의존성 검사
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: "features",
            allow: ["shared", "entities"],
          },
          {
            from: "pages",
            allow: ["features", "shared", "entities", "widgets"],
          },
          {
            from: "widgets",
            allow: ["shared", "entities"],
          },
          {
            from: "entities",
            allow: ["shared"],
          },
        ],
      },
    ],

    // ✅ import alias 강제
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../*"],
      },
    ],
  },

  settings: {
    "boundaries/elements": [
      { type: "pages", pattern: "src/pages/*" },
      { type: "widgets", pattern: "src/widgets/*" },
      { type: "features", pattern: "src/features/*" },
      { type: "entities", pattern: "src/entities/*" },
      { type: "shared", pattern: "src/shared/*" },
    ],
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};

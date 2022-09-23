module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
  "plugin:@typescript-eslint/recommended"],
  overrides: [
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
  },
  plugins: [
    "@typescript-eslint"
  ],
}

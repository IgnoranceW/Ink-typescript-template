module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'airbnb',
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures:{
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
  },
  rules: {
    'no-bitwise': 'off', // 不让用位操作符，不知道为啥，先关掉
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
  },
}

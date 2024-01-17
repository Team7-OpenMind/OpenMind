module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    "jest": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{cjs,js}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    jsx: true,
  },
  plugins: ["react", "jsx-a11y", "import", "react-hooks"],
  rules: {
    "import/no-named-as-default": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: ["js", "jsx"] }],
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
        paths: ["src"],
      },
    },
    react: {
      version: "detect",
    },
  },
};

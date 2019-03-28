module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-var': ['warn'],
    'no-console': ['off'],
    'no-unused-vars': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
  },
  globals: {},
};

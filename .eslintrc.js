module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: 'eslint',
  // extends: ['eslint', "plugin:react/recommended"],
  globals: {
    "beforeEach": false,
    "console": false,
    "describe": false,
    "document": false,
    "it": false,
    "localStorage": false,
    "require": false,
    "setTimeout": false
  },
  rules: {
    "require-jsdoc": 0,
    "comma-dangle": 0,
    "indent": [2, 2],
    "quotes": [2, "single"],
    "react/jsx-uses-vars": [2]
  },
};
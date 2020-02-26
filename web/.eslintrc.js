/*
 * @Description: 规则
 * @Author: leo
 * @Date: 2020-02-25 16:05:17
 * @LastEditors: leo
 * @LastEditTime: 2020-02-25 17:00:10
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['prettier', 'prettier/react', 'prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: []
}

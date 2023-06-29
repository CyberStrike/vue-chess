/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['vue', 'import'],
  ignorePatterns: ['dist', 'node_modules', '*.d.ts'],
  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    'import/parsers': '@typescript-eslint/parser',
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}

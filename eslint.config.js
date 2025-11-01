import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const jsTsRules = {
  // TypeScript best practices
  '@typescript-eslint/array-type': ['warn'],
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-assertions': 'warn',
  '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  '@typescript-eslint/consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: true,
    },
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports',
    },
  ],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'no-public',
    },
  ],
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    },
  ],
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-extraneous-class': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-inferrable-types': 'warn',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/no-shadow': 'warn',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/restrict-template-expressions': 'off',

  // JavaScript best practices
  eqeqeq: 'error',
  complexity: ['error', 20],
  curly: 'off',
  'guard-for-in': 'error',
  'max-classes-per-file': ['error', 1],
  'max-len': [
    'warn',
    {
      code: 120,
      comments: 160,
    },
  ],
  'max-lines': ['error', 400],
  'no-bitwise': 'error',
  'no-console': 'off',
  'no-new-wrappers': 'error',
  'no-useless-concat': 'error',
  'no-var': 'error',
  'no-restricted-syntax': 'off',
  'no-shadow': 'error',
  'one-var': ['error', 'never'],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      allowSeparatedGroups: true,
    },
  ],

  // Security
  'no-eval': 'error',
  'no-implied-eval': 'error',
};

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactCompiler.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    ignores: ['eslint.config.js', '**/node_modules', '**/dist', '**/temp'],
  },
  {
    files: ['**/*.{js,mjs,ts,jsx,tsx}'],
    plugins: {
      js,
      pluginReact,
      reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
      },
      globals: globals.browser,
    },
    extends: [
      js.configs.recommended,
      // importPlugin.flatConfigs.recommended,
      // importPlugin.flatConfigs.typescript,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      pluginReact.configs.flat.recommended,
      reactRefresh.configs.recommended,
      eslintConfigPrettier,
      prettierPlugin,
    ],
    rules: {
      ...jsTsRules,
      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     patterns: [{ regex: '^@fluentui/[^/]+$' }],
      //   },
      // ],
      // 'no-unnecessary-use-callback': 'error',
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended', eslintConfigPrettier, prettierPlugin],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended', eslintConfigPrettier, prettierPlugin],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended', eslintConfigPrettier, prettierPlugin],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended', eslintConfigPrettier, prettierPlugin],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    name: 'project-ignores',
    ignores: ['coverage', 'dist'],
  },
  {
    name: 'project-ts-tsx-config',
    extends: [js.configs.all, ...tseslint.configs.strictTypeChecked],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'comma-dangle': ['error', 'always-multiline'], // trailing commas
      complexity: ['error', { max: 9 }],
      'capitalized-comments': 'off', // useless
      'one-var': 'off', // useless
      curly: ['error', 'multi'], // only on multi
      'sort-imports': 'off', // not needed, vscode & biome does this
      'no-undefined': 'off', // well written ternaries are fine
      'no-ternary': 'off', // well written ternaries are fine
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }], // 💚 prefer function declaration
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    name: 'project-tsx-config-overrides',
    files: ['src/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-misused-promises': 'off', // annoying in forms
    },
  },
  {
    name: 'project-ui-overrides',
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'react-refresh/only-export-components': 'off',
      'no-magic-numbers': 'off',
      'no-negated-condition': 'off',
      'no-use-before-define': 'off',
      'sort-keys': 'off',
    },
  },
)

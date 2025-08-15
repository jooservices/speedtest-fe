import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    env: {
      es6: true,
      browser: true,
      jest: true,
      node: true,
    },
    settings: {
      react: {
        createClass: 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        pragma: 'React', // Pragma to use, default to "React"
        fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // It will default to "latest" and warn if missing, and to "detect" in the future
        flowVersion: '0.53', // Flow version
      },
    },
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-native', '@typescript-eslint'],
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/display-name': 0,
      'react/prop-types': 0,
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/member-delimiter-style': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-empty-function': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-console': [
        2,
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
])

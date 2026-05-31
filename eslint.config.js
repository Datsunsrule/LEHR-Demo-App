import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// NOTE: eslint-plugin-jsx-a11y (L7) was intentionally NOT added — its current
// release (6.10) only declares peer support for ESLint ≤ 9, and this project is
// on ESLint 10. Revisit once jsx-a11y ships ESLint 10 compatibility.
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
])

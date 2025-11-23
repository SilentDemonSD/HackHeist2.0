import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['args', 'attach', 'object', 'dispose', 'geometry', 'material', 'position', 'rotation', 'scale', 'castShadow', 'receiveShadow', 'intensity', 'fragmentShader', 'vertexShader', 'uniforms', 'side', 'transparent', 'opacity', 'wireframe', 'depthWrite'] }]
    },
    settings: { react: { version: 'detect' } },
  },
]

// .eslintrc.ts
export default {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'unused-imports'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
      node: true,
      es2020: true,
    },
    ignorePatterns: ['dist', 'build', 'node_modules'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
  
      // Imports
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
  
      // Limpieza
      'unused-imports/no-unused-imports': 'warn',
  
      // Código claro
      //'no-console': 'warn',
      'no-debugger': 'warn',
      
      "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
    },
  };
  
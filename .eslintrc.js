module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'memo', 'draft'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
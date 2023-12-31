module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
  },
  overrides: [
    {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      files: ['*.ts', '*.tsx'],
    },
  ],
};

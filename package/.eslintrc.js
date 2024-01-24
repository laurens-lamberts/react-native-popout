module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        additionalHooks:
          '(useAnimatedStyle|useAnimatedProps|useDerivedValue|useAnimatedGestureHandler)',
      },
    ],
    'object-shorthand': ['warn', 'always'],
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

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
    '@typescript-eslint/prefer-optional-chain': 'warn',
    'object-shorthand': ['warn', 'always'],
    'react-native/no-inline-styles': 'off',
  },
};

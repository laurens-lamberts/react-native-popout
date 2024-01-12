import { Easing, WithTimingConfig } from 'react-native-reanimated';

export const TRANSITION_CONFIG: WithTimingConfig = {
  duration: 500,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
  // overshootClamping: true,
};

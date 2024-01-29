import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PopoutContext } from './PopoutRootView';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CloseButton = ({
  hide,
  overlayProgress,
}: {
  hide: () => void;
  overlayProgress: SharedValue<number>;
}) => {
  const { overlayUnderNotch } = useContext(PopoutContext);
  // TODO: refactor into hook, together with the one in OverlayBackdrop.tsx
  const insets = useSafeAreaInsets(); // TODO: make more generic
  // const insets = useInsets
  //   ? safeAreaInsets
  //   : { top: 0, bottom: 0, left: 0, right: 0 };

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      overlayProgress.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Pressable
      onPress={hide}
      style={{
        position: 'absolute',
        top: overlayUnderNotch ? insets.top : 6,
        right: overlayUnderNotch ? insets.top / 2 : 6,
        zIndex: 9999,
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 18,
            height: 36,
            width: 36,
            backgroundColor: '#333',
            position: 'absolute',
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedOpacity,
        ]}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            top: -2, // ?
            left: 1, // ?
          }}
        >
          ×
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default CloseButton;

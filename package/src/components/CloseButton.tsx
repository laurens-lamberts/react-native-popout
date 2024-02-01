import React, { PropsWithChildren, useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PopoutContext } from './PopoutRootView';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const OpacityContainer = ({
  overlayProgress,
  children,
}: PropsWithChildren<{ overlayProgress: SharedValue<number> }>) => {
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      overlayProgress.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          zIndex: 9999,
        },
        animatedOpacity,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const CloseButton = ({ closeOverlay }: { closeOverlay: () => void }) => {
  const {
    overlayConfig: { overlayUnderNotch },
  } = useContext(PopoutContext);
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={closeOverlay}
      style={{
        position: 'absolute',
        top: overlayUnderNotch ? insets.top : 6,
        right: overlayUnderNotch ? insets.top / 2 : 6,
        borderRadius: 18,
        height: 36,
        width: 36,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
      }}
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
    </Pressable>
  );
};

export default ({
  overlayProgress,
  hide: closeOverlay,
}: {
  overlayProgress: SharedValue<number>;
  hide: () => void;
}) => {
  const { CloseButtonComponent } = useContext(PopoutContext);

  return (
    <OpacityContainer overlayProgress={overlayProgress}>
      {CloseButtonComponent ? (
        <CloseButtonComponent closeOverlay={closeOverlay} />
      ) : (
        <CloseButton closeOverlay={closeOverlay} />
      )}
    </OpacityContainer>
  );
};

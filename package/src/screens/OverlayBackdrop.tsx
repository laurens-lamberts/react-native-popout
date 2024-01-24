import React, { useContext } from 'react';
import {
  Blur,
  Canvas,
  ColorMatrix,
  Image,
  SkImage,
} from '@shopify/react-native-skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import { OVERLAY_BACKDROP_FROM_IMAGE } from '../config/settings';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { PopoutContext } from '../components/PopoutRootView';

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

const OverlayBackdrop = ({
  image,
  blurred,
  opacity,
  tileWidth,
  tileHeight,
  overlayProgress,
}: {
  image: SkImage;
  blurred?: boolean;
  opacity: SharedValue<number> | number;
  tileWidth?: number;
  tileHeight?: number;
  overlayProgress: SharedValue<number>;
}) => {
  // TODO: refactor into hook, together with the one in Overlay.tsx
  const { overlayUnderNotch } = useContext(PopoutContext);
  const safeAreaInsets = useSafeAreaInsets(); // TODO: make more generic
  const insets = overlayUnderNotch
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : safeAreaInsets;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const dimmed = blurred;

  const viewStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight - insets.top,
    backgroundColor: '#000',
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: typeof opacity === 'number' ? opacity : opacity?.value,
    };
  });

  if (!OVERLAY_BACKDROP_FROM_IMAGE) {
    return <View style={viewStyle} />;
  }

  const aspectRatio = !!tileWidth && !!tileHeight ? tileWidth / tileHeight : 1;
  // alert(aspectRatio);
  // Calculate the height of the OverlayBackdrop based on the width of the PopoutTile image and its aspect ratio
  const width = screenWidth;

  const height = useDerivedValue(() => {
    // TODO: in height we need minus 40 for appstore, plus 50 for netflix...
    return interpolate(
      overlayProgress.value,
      [0, 1],
      [screenHeight - insets.top - screenWidth * aspectRatio + 50, screenHeight]
    );
  });

  return (
    <AnimatedCanvas style={[viewStyle, animatedStyle]} pointerEvents="none">
      <Image
        image={image}
        fit="cover"
        width={width}
        height={height}
        // y={-height / 2}
      >
        <Blur blur={blurred ? 150 : 0} mode="clamp">
          {dimmed && (
            <ColorMatrix
              matrix={[
                0.6, 0.0, 0.0, 0.0, -0.053, 0.0, 0.6, 0.0, 0.0, -0.053, 0.0,
                0.0, 0.6, 0.0, -0.053, 0.0, 0.0, 0.0, 1.0, 0.0,
              ]} // generated with https://fecolormatrix.com/; brightness (-0.053) and exposure (0.6)
            />
          )}
        </Blur>
      </Image>
    </AnimatedCanvas>
  );
};
export default OverlayBackdrop;

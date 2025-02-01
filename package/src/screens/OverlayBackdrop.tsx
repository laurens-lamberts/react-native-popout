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

const OverlayBackdrop = ({
  image,
  blurred,
  opacity,
  tileWidth,
  tileHeight,
  overlayProgress,
  overlayImageStyle,
}: {
  image: SkImage;
  blurred?: boolean;
  opacity: SharedValue<number> | number;
  tileWidth?: number;
  tileHeight?: number;
  overlayProgress: SharedValue<number>;
  overlayImageStyle?: ViewStyle;
}) => {
  const {
    overlayConfig: { overlayNotchInset, overlayDimmedBackground },
  } = useContext(PopoutContext);
  const safeAreaInsets = useSafeAreaInsets();
  const insets = overlayNotchInset
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : safeAreaInsets;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const dimmed = blurred && overlayDimmedBackground;

  const viewStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight - insets.top,
    backgroundColor: '#000',
  };

  const height = useDerivedValue(() => {
    const widthDifference = screenWidth / (tileWidth || 1);
    const newHeight = (tileHeight || 0) * widthDifference;

    return interpolate(
      overlayProgress.value,
      [0, 1],
      [newHeight, screenHeight]
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: typeof opacity === 'number' ? opacity : opacity?.value || 1,
      width: screenWidth,
      height: height?.value || 0,
    };
  });

  if (!OVERLAY_BACKDROP_FROM_IMAGE) {
    return <View style={viewStyle} />;
  }

  return (
    <Animated.View style={[viewStyle, animatedStyle]} pointerEvents="none">
      <Canvas style={[{ flex: 1 }, overlayImageStyle]}>
        <Image image={image} fit="cover" width={screenWidth} height={height}>
          {blurred && (
            <Blur blur={dimmed ? 150 : 15} mode={dimmed ? 'decal' : 'clamp'}>
              {dimmed && (
                <ColorMatrix
                  matrix={[
                    0.7, 0.0, 0.0, 0.0, -0.03, 0.0, 0.7, 0.0, 0.0, -0.03, 0.0,
                    0.0, 0.7, 0.0, -0.03, 0.0, 0.0, 0.0, 1.0, 0.0,
                  ]} // brightness (-0.03) and exposure (0.7)
                />
              )}
            </Blur>
          )}
        </Image>
      </Canvas>
    </Animated.View>
  );
};
export default OverlayBackdrop;

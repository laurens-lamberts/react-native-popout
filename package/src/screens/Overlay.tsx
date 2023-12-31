import React, { useEffect, useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SPRING_CONFIG } from '../app/config/animations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TileInfo } from './Overview';
import OverlayContent from './OverlayContent';
import CloseButton from '../app/components/CloseButton';
import OverlayBackdrop from './OverlayBackdrop';
import { SkImage } from '@shopify/react-native-skia';
import {
  BORDER_RADIUS_OVERLAY,
  BORDER_RADIUS_TILE,
} from '../app/config/settings';

interface Props extends React.ComponentProps<typeof Animated.View> {
  item: TileInfo;
  hide: () => void;
  image: SkImage;
}
const Overlay = ({ item, hide, image }: Props) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets(); // TODO: make more generic
  const screenHeightMinusInset = screenHeight - insets.top;

  // We have all separate values, because we need to perform the animations imperatively due to new data coming in via props
  const overlayProgress = useSharedValue(0);
  const overlayX = useSharedValue(0);
  const overlayY = useSharedValue(0);

  const scale = (item.origin?.width || 0) / screenWidth;
  // const aspectRatio = (item.origin?.width || 0) / (item.origin?.height || 0);
  const overlayScale = useSharedValue(scale);
  // const overlayHeight = useSharedValue(item.origin?.height || 0);

  const shadowImageOpacity = useSharedValue(1);

  const panX = useSharedValue(0);
  const panY = useSharedValue(0);
  const panScale = useSharedValue(1);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);

  const resetOverlay = () => {
    'worklet';
    overlayProgress.value = withTiming(0, SPRING_CONFIG, () => {
      runOnJS(hide)(); // todo; earlier
    });
    overlayX.value = withTiming(0, SPRING_CONFIG);
    overlayY.value = withTiming(0, SPRING_CONFIG);
    overlayScale.value = withTiming(
      (item.origin?.width || 0) / screenWidth,
      SPRING_CONFIG
    );
    shadowImageOpacity.value = withTiming(1, SPRING_CONFIG);
    /* overlayHeight.value = withTiming(
      (item.origin?.height || 0) * overlayScale.value,
      SPRING_CONFIG,
    ); */
  };
  const resetPan = () => {
    'worklet';
    panX.value = withSpring(0, SPRING_CONFIG);
    panY.value = withSpring(0, SPRING_CONFIG);
    panScale.value = withSpring(1, SPRING_CONFIG);
  };
  const onOpen = () => {
    'worklet';
    // Entering animation
    overlayProgress.value = withTiming(1, SPRING_CONFIG);
    overlayX.value = withTiming(-(item?.origin?.x || 0), SPRING_CONFIG);
    overlayY.value = withTiming(
      -(item.origin?.y || 0) + insets.top,
      SPRING_CONFIG
    );
    // overlayHeight.value = withTiming(item.origin?.height, {duration: 0});
    // overlayHeight.value = withTiming(screenHeight - insets.top, SPRING_CONFIG);
    overlayScale.value = withTiming(1, SPRING_CONFIG);
    shadowImageOpacity.value = withTiming(0, SPRING_CONFIG);
  };
  const onClose = () => {
    'worklet';
    // Closing animation
    resetOverlay();
    resetPan();
  };

  useEffect(() => {
    runOnUI(onOpen)();
  }, []);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: overlayX.value + panX.value },
        { translateY: overlayY.value + panY.value },
        { scale: overlayScale.value + panScale.value - 1 },
      ],
      /* height: interpolate(
        overlayScale.value,
        [0, scale],
        [item.origin?.height || 0, screenWidth / aspectRatio - insets.top],
        Extrapolation.CLAMP,
      ), */
      /* height: interpolate(
        overlayScale.value,
        [0, scale],
        [item.origin?.height || 0, screenHeight - insets.top],
        Extrapolation.CLAMP,
      ), */
      borderRadius: interpolate(
        overlayProgress.value,
        [0, 1],
        [BORDER_RADIUS_TILE, BORDER_RADIUS_OVERLAY]
      ),
      opacity: interpolate(overlayProgress.value, [0, 0.05, 1], [0, 0.7, 1]),
    };
  }, [item]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onChange((event) => {
          panX.value = event.translationX;
          panY.value = event.translationY;
          panScale.value = interpolate(
            event.translationY,
            [0, 500],
            [1, 0.75],
            Extrapolation.CLAMP
          );
        })
        .onEnd((event) => {
          event.translationY > 200 ? onClose() : resetPan();
        }),
    [onClose, insets.top, item, panStartX, panStartY, panX, panY, panScale]
  );

  /* const colors = useImageColors(item.image);

  const textColor = useMemo(() => {
    const backgroundColor =
      colors?.platform === 'android'
        ? colors?.dominant
        : colors?.platform === 'ios'
        ? colors?.background
        : 'white';
    return getReadableTextColorByBackground(backgroundColor);
  }, [colors]); */

  return (
    <Animated.View
      style={[
        {
          zIndex: 100,
          width: screenWidth,
          height: screenHeightMinusInset,
          overflow: 'hidden',
          // @ts-ignore works!
          transformOrigin: 'top left',
        },
        overlayAnimatedStyle,
      ]}
    >
      <GestureDetector gesture={panGesture}>
        <View>
          <OverlayBackdrop image={image} blurred opacity={1} />
          <OverlayContent item={item} textColor="white" />
          <CloseButton hide={onClose} />
          <OverlayBackdrop image={image} opacity={shadowImageOpacity} />
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Overlay;

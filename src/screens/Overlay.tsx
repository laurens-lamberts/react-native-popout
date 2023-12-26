import React, {useEffect, useMemo} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SPRING_CONFIG} from '../app/config/animations';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TileInfo} from './Overview';
import OverlayContent from './OverlayContent';
import CloseButton from '../app/components/CloseButton';
import OverlayBackdrop from './OverlayBackdrop';
import {SkImage} from '@shopify/react-native-skia';

interface Props extends React.ComponentProps<typeof Animated.View> {
  item: TileInfo;
  hide: () => void;
  image: SkImage;
}
const Overlay = ({item, hide, image, ...props}: Props) => {
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // TODO: make more generic

  // We have all separate values, because we need to perform the animations imperatively due to new data coming in via props
  const overlayBorderRadius = useSharedValue(0);
  const overlayX = useSharedValue(0);
  const overlayY = useSharedValue(0);
  const overlayScale = useSharedValue((item.origin?.width || 0) / screenWidth);

  const panX = useSharedValue(0);
  const panY = useSharedValue(0);
  const panScale = useSharedValue(1);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);

  const onOpen = () => {
    'worklet';
    // Entering animation
    overlayBorderRadius.value = withTiming(1, SPRING_CONFIG);
    overlayX.value = withTiming(-(item?.origin?.x || 0), SPRING_CONFIG);
    overlayY.value = withTiming(
      -(item.origin?.y || 0) + insets.top,
      SPRING_CONFIG,
    );
    overlayScale.value = withTiming(1, SPRING_CONFIG);
  };
  const onClose = () => {
    'worklet';
    // Closing animation
    overlayBorderRadius.value = withTiming(0, SPRING_CONFIG, () => {
      runOnJS(hide)();
    });
    overlayX.value = withTiming(0, SPRING_CONFIG);
    overlayY.value = withTiming(0, SPRING_CONFIG);
    overlayScale.value = withTiming(
      (item.origin?.width || 0) / screenWidth,
      SPRING_CONFIG,
    );
  };

  useEffect(() => {
    runOnUI(onOpen)();
  }, []);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: overlayX.value + panX.value},
        {translateY: overlayY.value + panY.value},
        {scale: overlayScale.value + panScale.value - 1},
      ],
      borderRadius: interpolate(overlayBorderRadius.value, [0, 1], [4, 16]),
      // opacity: interpolate(overlayBorderRadius.value, [0, 1], [0, 1]),
    };
  }, [item]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          panStartX.value = -(item?.origin?.x || 0);
          panStartY.value = -(item?.origin?.y || 0) + insets.top;
        })
        .onChange(event => {
          panX.value = panStartX.value + event.translationX;
          panY.value = panStartY.value + event.translationY;
          panScale.value = interpolate(
            event.translationY,
            [0, 500],
            [1, 0.75],
            Extrapolation.CLAMP,
          );
        })
        .onEnd(event => {
          if (event.translationY > 200) {
            onClose();
          } else {
            panX.value = withSpring(panStartX.value, SPRING_CONFIG);
            panY.value = withSpring(panStartY.value, SPRING_CONFIG);
            panScale.value = withSpring(1, SPRING_CONFIG);
          }
        }),
    [onClose, insets.top, item, panStartX, panStartY, panX, panY, panScale],
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
          height: screenHeight,
          overflow: 'hidden',
          transformOrigin: 'top left',
          // transformOrigin: 'top center', // TODO: this should be the origin for the pan gesture
        },
        overlayAnimatedStyle,
      ]}>
      <GestureDetector gesture={panGesture}>
        <View
          style={
            {
              // padding: 12,
            }
          }>
          <OverlayBackdrop image={image} />
          <OverlayContent item={item} textColor="white" />
          <CloseButton hide={onClose} />
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Overlay;

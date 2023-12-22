import React, {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ENABLE_DEBUG_COLORS} from '../app/config/settings';
import {SPRING_CONFIG} from '../app/config/animations';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TileInfo} from './Overview';
import OverlayContent from './OverlayContent';
import CloseButton from '../app/components/CloseButton';
import OverlayBackdrop from './OverlayBackdrop';
import {
  getReadableTextColorByBackground,
  useImageColors,
} from '../app/helpers/colors';
import {SkImage} from '@shopify/react-native-skia';

interface Props extends React.ComponentProps<typeof Animated.View> {
  item: TileInfo;
  hide: ({
    dragX,
    dragY,
    scale,
  }: {
    dragX: number;
    dragY: number;
    scale: number;
  }) => void;
  image: SkImage;
}
const Overlay = ({item, hide, image, ...props}: Props) => {
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // TODO: make more generic

  const ContentScaleEntering: EntryOrExitLayoutType = values => {
    'worklet';
    const animations = {
      transform: [
        {
          scale: withSpring(1, SPRING_CONFIG),
        },
      ],
      opacity: withTiming(1, {duration: 500}),
    };
    const initialValues = {
      // initial values for animations
      transform: [{scale: (item.origin?.width || 0) / screenWidth}],
      opacity: 0,
    };
    const callback = (finished: boolean) => {
      // optional callback that will fire when layout animation ends
    };
    return {initialValues, animations, callback};
  };

  const ContentScaleExiting: EntryOrExitLayoutType = values => {
    'worklet';
    const animations = {
      transform: [
        {
          scale: withSpring(
            (item.origin?.width || 0) / screenWidth,
            SPRING_CONFIG,
          ),
        },
      ],
      opacity: withTiming(0, {duration: 500}),
    };
    const initialValues = {
      // initial values for animations
      transform: [{scale: 1}],
      opacity: 1,
    };
    const callback = (finished: boolean) => {
      // optional callback that will fire when layout animation ends
    };
    return {initialValues, animations, callback};
  };

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          startX.value = -(item?.origin?.x || 0);
          startY.value = -(item?.origin?.y || 0) + insets.top;
        })
        .onChange(event => {
          x.value = startX.value + event.translationX;
          y.value = startY.value + event.translationY;
          scale.value = interpolate(
            event.translationY,
            [0, 500],
            [1, 0.75],
            Extrapolation.CLAMP,
          );
        })
        .onEnd(event => {
          if (event.translationY > 200) {
            runOnJS(hide)({
              dragX: event.translationX + 32, // TODO: why this magic number?
              dragY: event.translationY,
              scale: scale.value,
            });
          } else {
            x.value = withSpring(startX.value, SPRING_CONFIG);
            y.value = withSpring(startY.value, SPRING_CONFIG);
            scale.value = withSpring(1, SPRING_CONFIG);
          }
        }),
    [hide, insets.top, item, startX, startY, x, y, scale],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {scale: scale.value},
      ],
    };
  }, [x, y, scale]);

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
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            flex: 1,
            // backgroundColor: ENABLE_DEBUG_COLORS ? 'lime' : 'white',
            zIndex: 100,
            borderRadius: 16,
            width: screenWidth,
            height: screenHeight,
            position: 'absolute',
            overflow: 'hidden',
            transformOrigin: 'top center',
          },
          animatedStyle,
        ]}
        {...props}>
        <Animated.View
          entering={ContentScaleEntering}
          exiting={ContentScaleExiting}
          style={{
            transformOrigin: 'top left',
            padding: 12,
          }}>
          <OverlayBackdrop image={image} />
          <OverlayContent item={item} textColor={'white'} />
          <CloseButton hide={hide} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Overlay;

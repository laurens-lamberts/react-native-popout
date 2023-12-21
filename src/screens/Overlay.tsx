import React, {useMemo} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {ENABLE_DEBUG_COLORS} from '../app/config/settings';
import {SPRING_CONFIG} from '../app/config/animations';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TileInfo} from './Overview';

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
}
const Overlay = ({item, hide, ...props}: Props) => {
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // TODO: make more generic

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const gestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          startX.value = -(item?.origin?.x || 0);
          startY.value = -(item?.origin?.y || 0) + insets.top;
        })
        .onChange(event => {
          x.value = startX.value + event.translationX;
          y.value = startY.value + event.translationY;

          // console.log(y.value);

          scale.value = interpolate(
            event.translationY,
            [0, 500],
            [1, 0.75],
            Extrapolation.CLAMP,
          );
        })
        .onEnd(event => {
          if (event.translationY > 200) {
            // close
            runOnJS(hide)({
              dragX: event.translationX,
              dragY: event.translationY,
              scale: scale.value,
            });
          } else {
            x.value = withSpring(startX.value, SPRING_CONFIG);
            y.value = withSpring(startY.value, SPRING_CONFIG);
            scale.value = withSpring(1, SPRING_CONFIG);
          }
        }),
    [
      hide,
      insets.top,
      item?.origin?.x,
      item?.origin?.y,
      startX,
      startY,
      x,
      y,
      scale,
    ],
  );

  /* const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = -(item?.origin?.x || 0);
      ctx.startY = -(item?.origin?.y || 0) + insets.top;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;

      // console.log(y.value);

      scale.value = interpolate(
        event.translationY,
        [0, 500],
        [1, 0.75],
        Extrapolation.CLAMP,
      );
    },
    onEnd: (event, ctx) => {
      if (event.translationY > 200) {
        // close
        runOnJS(hide)({
          dragX: event.translationX,
          dragY: event.translationY,
          scale: scale.value,
        });
      } else {
        x.value = withSpring(ctx.startX, SPRING_CONFIG);
        y.value = withSpring(ctx.startY, SPRING_CONFIG);
        scale.value = withSpring(1, SPRING_CONFIG);
      }
    },
  }); */

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  }, [x, y, scale]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: ENABLE_DEBUG_COLORS ? 'lime' : 'white',
            zIndex: 100,
            borderRadius: 16,
            width: screenWidth,
            height: screenHeight,
            padding: 12,
            position: 'absolute',
          },
          animatedStyle,
        ]}
        {...props}>
        <Text>{item.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Overlay;

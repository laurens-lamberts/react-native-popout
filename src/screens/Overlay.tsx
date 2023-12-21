import React, {useMemo} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  ZoomIn,
  ZoomOutEasyDown,
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
      transform: [{scale: 0}],
      opacity: 0,
    };
    const callback = (finished: boolean) => {
      // optional callback that will fire when layout animation ends
    };
    return {
      initialValues,
      animations,
      callback,
    };
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
    return {
      initialValues,
      animations,
      callback,
    };
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

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: ENABLE_DEBUG_COLORS ? 'lime' : 'white',
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
          <View
            style={{
              marginBottom: 20,
              backgroundColor: '#678',
              marginLeft: -12,
              marginRight: -12,
              marginTop: -12,
              padding: 12,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              {item.title}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              gap: 20,
            }}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
              facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
              nunc non hendrerit finibus, massa nunc blandit ante, vitae
              tincidunt est eros id nunc. Sed vitae lorem et libero tincidunt
              molestie. Donec sit amet libero eget mi aliquam aliquet. Nullam id
              augue quis enim lacinia consequat. Maecenas vitae nunc eget diam
              ultrices lacinia. Donec euismod ultricies nunc, sed aliquet nunc
              commodo vitae. Nulla facilisi. Morbi et lorem at nisl aliquet
              luctus. Sed quis rhoncus nisi. Nullam vitae libero quis turpis
              aliquam ultricies eget eget elit. Nullam eget nisl vel ipsum
              aliquam molestie. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
              facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
              nunc non hendrerit finibus, massa nunc blandit ante, vitae
              tincidunt est eros id nunc. Sed vitae lorem et libero tincidunt
              molestie. Donec sit amet libero eget mi aliquam aliquet. Nullam id
              augue quis enim lacinia consequat. Maecenas vitae nunc eget diam
              ultrices lacinia. Donec euismod ultricies nunc, sed aliquet nunc
              commodo vitae. Nulla facilisi. Morbi et lorem at nisl aliquet
              luctus. Sed quis rhoncus nisi. Nullam vitae libero quis turpis
              aliquam ultricies eget eget elit. Nullam eget nisl vel ipsum
              aliquam molestie. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
              facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
              nunc non hendrerit finibus, massa nunc blandit ante, vitae
              tincidunt est eros id nunc. Sed vitae lorem et libero tincidunt
              molestie. Donec sit amet libero eget mi aliquam aliquet. Nullam id
              augue quis enim lacinia consequat. Maecenas vitae nunc eget diam
              ultrices lacinia. Donec euismod ultricies nunc, sed aliquet nunc
              commodo vitae. Nulla facilisi. Morbi et lorem at nisl aliquet
              luctus. Sed quis rhoncus nisi. Nullam vitae libero quis turpis
              aliquam ultricies eget eget elit. Nullam eget nisl vel ipsum
              aliquam molestie. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
              facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
              nunc non hendrerit finibus, massa nunc blandit ante, vitae
              tincidunt est eros id nunc. Sed vitae lorem et libero tincidunt
              molestie. Donec sit amet libero eget mi aliquam aliquet. Nullam id
              augue quis enim lacinia consequat. Maecenas vitae nunc eget diam
              ultrices lacinia. Donec euismod ultricies nunc, sed aliquet nunc
              commodo vitae. Nulla facilisi. Morbi et lorem at nisl aliquet
              luctus. Sed quis rhoncus nisi. Nullam vitae libero quis turpis
              aliquam ultricies eget eget elit. Nullam eget nisl vel ipsum
              aliquam molestie. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla facilisi.
            </Text>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Overlay;

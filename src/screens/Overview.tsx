import React, {RefObject, useRef} from 'react';
import Row from '../app/components/Row';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SPRING_CONFIG} from '../app/config/animations';
import {Pressable, Text, View, useWindowDimensions} from 'react-native';
import TilePresentation from '../app/components/TilePresentation';
import TileAnimation from '../app/components/TileAnimation';
import {ENABLE_DEBUG_COLORS} from '../app/config/settings';
import {
  Blur,
  BlurMask,
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';

export type TileInfo = {
  id: number;
  title: string;
  origin?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const DATA = {
  testCollection: [
    {
      id: 0,
      title: 'Kip',
      // image:
    },
    {
      id: 1,
      title: 'Paard',
    },
    {
      id: 2,
      title: 'Koe',
    },
    {
      id: 3,
      title: 'Schaap',
    },
  ],
} as {
  testCollection: TileInfo[];
};

const Overview = () => {
  const [elementOpened, setElementOpened] = React.useState<TileInfo | null>(
    null,
  );

  const onElementTap = async (
    viewRef: RefObject<Animated.View>,
    index: number,
  ) => {
    if (elementOpened) {
      setElementOpened(null);
      return;
    }

    await makeOverviewSnapshot();

    viewRef.current?.measureInWindow((x, y, width, height) => {
      setElementOpened({
        ...DATA.testCollection[index],
        origin: {
          x,
          y,
          width,
          height,
        },
      });
    });
  };

  const animatedOverviewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(elementOpened ? 0.94 : 1, {
            ...SPRING_CONFIG,
          }),
        },
      ],
      opacity: withSpring(elementOpened ? 0 : 1, SPRING_CONFIG),
    };
  });

  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(elementOpened ? 0.94 : 1, {
            ...SPRING_CONFIG,
          }),
        },
      ],
      opacity: withSpring(elementOpened ? 1 : 0, SPRING_CONFIG),
    };
  });

  const ROWS = [
    {id: 0, title: 'Favorites'},
    {id: 1, title: 'Trending'},
    {id: 2, title: 'New'},
    {id: 3, title: 'Coming soon'},
  ]; // TEMP

  const overviewRef = useRef<View>(null);
  const snapshot = useSharedValue<SkImage | null>(null);
  const [snapshotOrigin, setSnapshotOrigin] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const blur = useSharedValue(0);

  const makeOverviewSnapshot = async () => {
    if (!overviewRef.current) {
      return;
    }
    overviewRef.current.measureInWindow(async (x, y, width, height) => {
      setSnapshotOrigin({
        x,
        y,
        width,
        height,
      });
      snapshot.value = await makeImageFromView(overviewRef);
      blur.value = withTiming(8, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
    });
  };

  const onClose = () => {
    setElementOpened(null);
    blur.value = withTiming(0, {duration: 600, easing: Easing.out(Easing.exp)});
  };

  return (
    <>
      <View
        pointerEvents="box-none"
        ref={overviewRef}
        style={{
          backgroundColor: ENABLE_DEBUG_COLORS ? '#666' : 'black',
          zIndex: 1,
        }}>
        <Animated.ScrollView
          style={animatedOverviewStyle}
          scrollEnabled={!elementOpened}>
          <Pressable
            style={{
              margin: 12,
              backgroundColor: ENABLE_DEBUG_COLORS ? 'blue' : undefined,
              gap: 20,
            }}
            onPress={onClose}>
            {ROWS.map(rowData => (
              <View key={rowData.id} style={{gap: 8}}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {rowData.title}
                </Text>
                <Row scrollEnabled={!elementOpened}>
                  {DATA.testCollection.map((item, index) => (
                    <TilePresentation
                      key={item.id}
                      item={item}
                      onTap={viewRef => onElementTap(viewRef, index)}
                      isOpened={elementOpened?.id === item.id}
                    />
                  ))}
                </Row>
              </View>
            ))}
          </Pressable>
        </Animated.ScrollView>
      </View>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            left: snapshotOrigin?.x,
            top: snapshotOrigin?.y,
            width: snapshotOrigin?.width,
            height: snapshotOrigin?.height,
            zIndex: 98,
          },
          animatedBlurStyle,
        ]}>
        <Canvas
          style={{
            flex: 1,
          }}>
          <Image
            image={snapshot}
            fit="contain"
            width={snapshotOrigin?.width || 0}
            height={snapshotOrigin?.height || 0}>
            <Blur blur={blur} />
          </Image>
        </Canvas>
      </Animated.View>
      {elementOpened && (
        <View style={{position: 'absolute', zIndex: 99}}>
          <TileAnimation item={elementOpened} hide={onClose} />
        </View>
      )}
    </>
  );
};

export default Overview;

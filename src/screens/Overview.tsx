import React, {RefObject, useRef, useState} from 'react';
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
import OverlayAnchor from '../app/components/OverlayAnchor';
import {ENABLE_DEBUG_COLORS} from '../app/config/settings';
import {
  Blur,
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';

export type TileInfo = {
  id: number;
  title: string;
  image: string;
  origin?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const DUMMY_IMAGES = [
  'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/df/CureforWellnessOfficialPoster.jpeg',
  'https://m.media-amazon.com/images/M/MV5BMTYzMjA3OTgxOV5BMl5BanBnXkFtZTgwMjAwMDU5NjM@._V1_FMjpg_UX1000_.jpg',
  'https://cms.giggster.com/guide/directus/assets/49134223-36d0-489e-86f3-d2f528e14236?fit=cover&width=400&quality=80',
  'https://resizing.flixster.com/lpJkDxnEFNQT1OWJjnmYfvpAHJ0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjI2NjgyOS53ZWJw',
];

const DATA = {
  testCollection: [
    {
      id: 0,
      title: 'Kip',
      image: DUMMY_IMAGES[0],
    },
    {
      id: 1,
      title: 'Paard',
      image: DUMMY_IMAGES[1],
    },
    {
      id: 2,
      title: 'Koe',
      image: DUMMY_IMAGES[2],
    },
    {
      id: 3,
      title: 'Schaap',
      image: DUMMY_IMAGES[3],
    },
  ],
} as {
  testCollection: TileInfo[];
};

const Overview = () => {
  const [elementOpened, setElementOpened] = useState<TileInfo | null>(null);

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

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
  const [snapshotOrigin, setSnapshotOrigin] = useState<{
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
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            width: screenWidth,
            height: screenHeight,
          }}>
          <OverlayAnchor item={elementOpened} hide={onClose} />
        </View>
      )}
    </>
  );
};

export default Overview;

import React, { RefObject, useRef, useState } from 'react';
import { SPRING_CONFIG } from '../config/animations';
import { Pressable, View, useWindowDimensions } from 'react-native';
import OverlayAnchor from '../components/OverlayAnchor';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Blur,
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';
import { PopoutTileType } from '../types/PopoutTile';

type PopoutContextType = {
  elementOpened: PopoutTileType | null;
  onElementTap?: (
    viewRef: RefObject<Animated.View>,
    item: PopoutTileType
  ) => void;
  OverlayComponent: React.ComponentType | null;
  setOverlayComponent: React.Dispatch<
    React.SetStateAction<React.ComponentType | null>
  >;
};

export const PopoutContext = React.createContext<PopoutContextType>({
  elementOpened: null,
  onElementTap: () => {},
  OverlayComponent: null,
  setOverlayComponent: () => {},
});

const PopoutRootView = ({
  children,
  scroll = 'vertical',
}: {
  children: React.ReactNode;
  scroll: 'disabled' | 'horizontal' | 'vertical';
}) => {
  const [elementOpened, setElementOpened] = useState<PopoutTileType | null>(
    null
  );
  const [OverlayComponent, setOverlayComponent] =
    useState<React.ComponentType | null>(null);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const onElementTap = async (
    viewRef: RefObject<Animated.View>,
    popoutTileData: PopoutTileType
  ) => {
    if (elementOpened || !popoutTileData) {
      setElementOpened(null);
      return;
    }

    await makeOverviewSnapshot();

    viewRef.current?.measureInWindow((x, y, width, height) => {
      setElementOpened({
        ...popoutTileData,
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
    setElementOpened(null); // TODO: animations are cut off too early
    blur.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <PopoutContext.Provider
      value={{
        elementOpened,
        onElementTap,
        OverlayComponent,
        setOverlayComponent,
      }}
    >
      <View
        pointerEvents="box-none"
        ref={overviewRef}
        style={{
          zIndex: 1,
          flex: 1,
        }}
      >
        <Animated.ScrollView
          style={[{ flex: 1 }, animatedOverviewStyle]}
          scrollEnabled={!elementOpened && scroll !== 'disabled'}
          horizontal={scroll === 'horizontal'}
        >
          <Pressable
            style={{
              margin: 12,
              gap: 20,
              flex: 1,
            }}
            onPress={onClose}
          >
            {children}
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
        ]}
      >
        <Canvas
          style={{
            flex: 1,
          }}
        >
          <Image
            image={snapshot}
            fit="contain"
            width={snapshotOrigin?.width || 0}
            height={snapshotOrigin?.height || 0}
          >
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
          }}
        >
          <OverlayAnchor item={elementOpened} hide={onClose}>
            {OverlayComponent}
          </OverlayAnchor>
        </View>
      )}
    </PopoutContext.Provider>
  );
};

export default PopoutRootView;

import React, { RefObject, useRef, useState } from 'react';
import { TRANSITION_CONFIG } from '../config/animations';
import { View, useWindowDimensions } from 'react-native';
import OverlayAnchor from '../components/OverlayAnchor';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Blur,
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { PopoutTileType } from '../types/PopoutTile';
import { BORDER_RADIUS_TILE } from '../config/settings';

type PopoutContextType = {
  elementOpened: PopoutTileType | null;
  onElementTap: (
    viewRef: RefObject<Animated.View>,
    item: PopoutTileType
  ) => void;
  OverlayComponent: React.ComponentType | null;
  setOverlayComponent: React.Dispatch<
    React.SetStateAction<React.ComponentType | null>
  >;
  overlayUnderNotch: boolean;
  setOverlayUnderNotch: React.Dispatch<React.SetStateAction<boolean>>;
  tileBorderRadius: number;
  setTileBorderRadius: React.Dispatch<React.SetStateAction<number>>;
  backdropScale: boolean;
  setBackdropScale: React.Dispatch<React.SetStateAction<boolean>>;
  backdropBlur: boolean;
  setBackdropBlur: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopoutContext = React.createContext<PopoutContextType>({
  elementOpened: null,
  onElementTap: () => {},
  OverlayComponent: null,
  setOverlayComponent: () => {},
  overlayUnderNotch: true,
  setOverlayUnderNotch: () => {},
  tileBorderRadius: BORDER_RADIUS_TILE,
  setTileBorderRadius: () => {},
  backdropScale: true,
  setBackdropScale: () => {},
  backdropBlur: true,
  setBackdropBlur: () => {},
});

const PopoutRootView = ({ children }: { children: React.ReactNode }) => {
  const [elementOpened, setElementOpened] = useState<PopoutTileType | null>(
    null
  );
  const [OverlayComponent, setOverlayComponent] =
    useState<React.ComponentType | null>(null);
  const [overlayUnderNotch, setOverlayUnderNotch] = useState(true);
  const [tileBorderRadius, setTileBorderRadius] = useState(BORDER_RADIUS_TILE);
  const [backdropScale, setBackdropScale] = useState(true);
  const [backdropBlur, setBackdropBlur] = useState(true);

  const panScale = useSharedValue(1);
  // We keep backdropProgress separate from panScale, as interpolating on the panScale poses problems with the return-to-tile transition
  const backdropProgress = useSharedValue(0);

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

  const backdropScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: backdropScale
            ? interpolate(
                backdropProgress.value,
                [0, 1],
                [1, 0.9],
                Extrapolation.CLAMP
              )
            : 1,
        },
      ],
    };
  });
  const animatedOverviewStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      elementOpened && backdropBlur ? 0 : 1,
      TRANSITION_CONFIG
    ),
  }));
  const animatedBlurStyle = useAnimatedStyle(() => ({
    opacity: withTiming(elementOpened ? 1 : 0, TRANSITION_CONFIG),
  }));
  const blur = useDerivedValue(() =>
    interpolate(backdropProgress.value, [0, 1], [0, 8], Extrapolation.CLAMP)
  );

  const overviewRef = useRef<View>(null);
  const snapshot = useSharedValue<SkImage | null>(null);
  const [snapshotOrigin, setSnapshotOrigin] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // const blur = useSharedValue(0);

  const makeOverviewSnapshot = async () => {
    if (!overviewRef.current) {
      return;
    }
    try {
      overviewRef.current.measureInWindow(async (x, y, width, height) => {
        setSnapshotOrigin({
          x,
          y,
          width,
          height,
        });
        snapshot.value = await makeImageFromView(overviewRef);
        // blur.value = withTiming(8, {
        //   duration: 600,
        //   easing: Easing.out(Easing.exp),
        // });
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const onClose = () => {
    setElementOpened(null); // TODO: animations are cut off too early
    // blur.value = withTiming(0, {
    //   duration: 700,
    //   easing: Easing.out(Easing.exp),
    // });
  };

  const tap = Gesture.Tap().onTouchesUp((state) => {
    if (state.numberOfTouches > 1) {
      onClose();
    }
  });

  return (
    <PopoutContext.Provider
      value={{
        OverlayComponent,
        elementOpened,
        onElementTap,
        setOverlayComponent,
        overlayUnderNotch,
        setOverlayUnderNotch,
        tileBorderRadius,
        setTileBorderRadius,
        backdropScale,
        setBackdropScale,
        backdropBlur,
        setBackdropBlur,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          pointerEvents="box-none"
          ref={overviewRef}
          collapsable={false}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={[{ flex: 1 }, backdropScaleStyle, animatedOverviewStyle]}
          >
            <GestureDetector gesture={tap}>{children}</GestureDetector>
          </Animated.View>
        </View>
        {backdropBlur && (
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
              backdropScaleStyle,
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
        )}
        {elementOpened && (
          <View
            style={{
              position: 'absolute',
              zIndex: 99,
              width: screenWidth,
              height: screenHeight,
            }}
          >
            <OverlayAnchor
              item={elementOpened}
              hide={onClose}
              panScale={panScale}
              backdropProgress={backdropProgress}
            >
              {OverlayComponent}
            </OverlayAnchor>
          </View>
        )}
      </GestureHandlerRootView>
    </PopoutContext.Provider>
  );
};

export default PopoutRootView;

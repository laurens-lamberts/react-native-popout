import React, {
  ComponentType,
  ReactNode,
  RefObject,
  createContext,
  useRef,
  useState,
} from 'react';
import { View, useWindowDimensions } from 'react-native';
import OverlayAnchor from '../components/OverlayAnchor';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Blur,
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PopoutTileType } from '../types/PopoutTile';
import { BORDER_RADIUS_OVERLAY, BORDER_RADIUS_TILE } from '../config/settings';

export type OverlayConfigType = {
  tileBorderRadius?: number;
  backdropScale?: boolean;
  backdropBlur?: boolean;
  hasPanHandle?: boolean;
  dimmedOverlayBackdrop?: boolean;
  tileOriginContainerRef?: RefObject<View>;
  overlayUnderNotch?: boolean;
  overlayBorderRadius?: number;
};

type PopoutContextType = {
  elementOpened?: PopoutTileType;
  onElementTap: (
    viewRef: RefObject<Animated.View>,
    item: PopoutTileType,
    overlayConfig: OverlayConfigType,
    overlayComponent: ComponentType
  ) => void;
  overlayConfig: OverlayConfigType;
};

const DEFAULT_OVERLAY_CONFIG: OverlayConfigType = {
  tileBorderRadius: BORDER_RADIUS_TILE,
  backdropScale: true,
  backdropBlur: true,
  hasPanHandle: true,
  dimmedOverlayBackdrop: true,
  tileOriginContainerRef: undefined,
  overlayUnderNotch: true,
  overlayBorderRadius: BORDER_RADIUS_OVERLAY,
};

export const PopoutContext = createContext<PopoutContextType>({
  elementOpened: undefined,
  onElementTap: () => {},
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
});

const PopoutRootView = ({ children }: { children: ReactNode }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [elementOpened, setElementOpened] = useState<PopoutTileType>();
  const [overlayConfig, setOverlayConfig] = useState<OverlayConfigType>(
    DEFAULT_OVERLAY_CONFIG
  );
  const [overlayComponent, setOverlayComponent] =
    useState<ComponentType | null>(null);

  const screenshotNecessary =
    overlayConfig.backdropScale || overlayConfig.backdropBlur;

  // We keep backdropProgress separate from panScale, as interpolating on the panScale poses problems with the return-to-tile transition
  const panScale = useSharedValue(1);
  const backdropProgress = useSharedValue(0);
  const popoutOpened = useSharedValue(false);

  useAnimatedReaction(
    () => backdropProgress.value,
    (value) => {
      if (value > 0 && !popoutOpened.value) {
        popoutOpened.value = true;
      }
      if (value === 0 && !!popoutOpened.value) {
        popoutOpened.value = false;
        runOnJS(setElementOpened)(undefined);
        runOnJS(setOverlayComponent)(null);
      }
    }
  );

  const onElementTap = async (
    viewRef: RefObject<Animated.View>,
    popoutTileData: PopoutTileType,
    newConfig: OverlayConfigType,
    newOverlayComponent: ComponentType
  ) => {
    const combinedConfig = {
      ...DEFAULT_OVERLAY_CONFIG,
      ...newConfig,
    };

    setOverlayConfig(combinedConfig);
    setOverlayComponent(newOverlayComponent);

    screenshotNecessary && (await makeOverviewSnapshot());

    if (overlayConfig.tileOriginContainerRef?.current) {
      viewRef.current?.measureLayout(
        overlayConfig.tileOriginContainerRef.current,
        (x, y, width, height) => {
          setElementOpened({
            ...popoutTileData,
            origin: {
              x,
              y,
              width,
              height,
            },
          });
        }
      );
    } else {
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
    }
  };

  const backdropScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: overlayConfig.backdropScale
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
  // The app itself will fade-out...
  const animatedOverviewStyle = useAnimatedStyle(() => ({
    opacity: overlayConfig.backdropBlur
      ? interpolate(
          backdropProgress.value,
          [0, 0.6, 1],
          [1, 0, 0],
          Extrapolation.CLAMP
        )
      : 1,
  }));
  // The screenshot will fade-in...
  const animatedBlurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      backdropProgress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
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
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <PopoutContext.Provider
      value={{
        elementOpened,
        onElementTap,
        overlayConfig,
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
            {children}
          </Animated.View>
        </View>
        {screenshotNecessary && (
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
            <Canvas style={{ flex: 1 }}>
              <Image
                image={snapshot}
                fit="contain"
                width={snapshotOrigin?.width || 0}
                height={snapshotOrigin?.height || 0}
              >
                <Blur blur={blur} mode="clamp" />
              </Image>
            </Canvas>
          </Animated.View>
        )}
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            width: screenWidth,
            height: screenHeight,
          }}
          pointerEvents="box-none"
        >
          <OverlayAnchor
            item={elementOpened}
            panScale={panScale}
            backdropProgress={backdropProgress}
          >
            {overlayComponent}
          </OverlayAnchor>
        </View>
      </GestureHandlerRootView>
    </PopoutContext.Provider>
  );
};

export default PopoutRootView;

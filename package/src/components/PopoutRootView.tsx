import React, {
  ComponentType,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
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

type PopoutContextType = {
  elementOpened?: PopoutTileType;
  onElementTap: (
    viewRef: RefObject<Animated.View>,
    item: PopoutTileType
  ) => void;
  OverlayComponent: ComponentType | null;
  setOverlayComponent: Dispatch<SetStateAction<ComponentType | null>>;
  overlayUnderNotch: boolean;
  setOverlayUnderNotch: Dispatch<SetStateAction<boolean>>;
  tileBorderRadius: number;
  overlayBorderRadius: number;
  setTileBorderRadius: Dispatch<SetStateAction<number>>;
  setOverlayBorderRadius: Dispatch<SetStateAction<number>>;
  backdropScale: boolean;
  setBackdropScale: Dispatch<SetStateAction<boolean>>;
  backdropBlur: boolean;
  setBackdropBlur: Dispatch<SetStateAction<boolean>>;
  hasPanHandle: boolean;
  setHasPanHandle: Dispatch<SetStateAction<boolean>>;
  tileOriginContainerRef?: RefObject<View>;
  setTileOriginContainerRef: Dispatch<
    SetStateAction<RefObject<View> | undefined>
  >;
  dimmedOverlayBackdrop: boolean;
  setDimmedOverlayBackdrop: Dispatch<SetStateAction<boolean>>;
};

export const PopoutContext = createContext<PopoutContextType>({
  elementOpened: undefined,
  onElementTap: () => {},
  OverlayComponent: null,
  setOverlayComponent: () => {},
  overlayUnderNotch: true,
  setOverlayUnderNotch: () => {},
  tileBorderRadius: BORDER_RADIUS_TILE,
  setTileBorderRadius: () => {},
  overlayBorderRadius: BORDER_RADIUS_OVERLAY,
  setOverlayBorderRadius: () => {},
  backdropScale: true,
  setBackdropScale: () => {},
  backdropBlur: true,
  setBackdropBlur: () => {},
  hasPanHandle: true,
  setHasPanHandle: () => {},
  tileOriginContainerRef: undefined,
  setTileOriginContainerRef: () => {},
  dimmedOverlayBackdrop: true,
  setDimmedOverlayBackdrop: () => {},
});

const PopoutRootView = ({ children }: { children: ReactNode }) => {
  const [elementOpened, setElementOpened] = useState<PopoutTileType>();
  const [OverlayComponent, setOverlayComponent] =
    useState<ComponentType | null>(null);
  const [overlayUnderNotch, setOverlayUnderNotch] = useState(true);
  const [tileBorderRadius, setTileBorderRadius] = useState(BORDER_RADIUS_TILE);
  const [overlayBorderRadius, setOverlayBorderRadius] = useState(
    BORDER_RADIUS_OVERLAY
  );
  const [hasPanHandle, setHasPanHandle] = useState(true);
  const [backdropScale, setBackdropScale] = useState(true);
  const [backdropBlur, setBackdropBlur] = useState(true);
  const [dimmedOverlayBackdrop, setDimmedOverlayBackdrop] = useState(true);
  const [tileOriginContainerRef, setTileOriginContainerRef] =
    useState<RefObject<View>>();

  const screenshotNecessary = backdropScale || backdropBlur;

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const panScale = useSharedValue(1);
  // We keep backdropProgress separate from panScale, as interpolating on the panScale poses problems with the return-to-tile transition
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
    popoutTileData: PopoutTileType
  ) => {
    screenshotNecessary && (await makeOverviewSnapshot());

    if (tileOriginContainerRef?.current) {
      viewRef.current?.measureLayout(
        tileOriginContainerRef.current,
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
  // The app itself will fade-out...
  const animatedOverviewStyle = useAnimatedStyle(() => ({
    opacity: backdropBlur
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

  /* const tap = Gesture.Tap().onTouchesUp((state) => {
    // if (state.numberOfTouches > 1) {
    //   onClose();
    // }
  }); */

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
        overlayBorderRadius,
        setOverlayBorderRadius,
        backdropScale,
        setBackdropScale,
        backdropBlur,
        setBackdropBlur,
        hasPanHandle,
        setHasPanHandle,
        tileOriginContainerRef,
        setTileOriginContainerRef,
        dimmedOverlayBackdrop,
        setDimmedOverlayBackdrop,
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
            {OverlayComponent}
          </OverlayAnchor>
        </View>
      </GestureHandlerRootView>
    </PopoutContext.Provider>
  );
};

export default PopoutRootView;

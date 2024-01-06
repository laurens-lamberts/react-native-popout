import React, { useRef, useState } from 'react';
import { SPRING_CONFIG } from '../config/animations';
import { Pressable, View, useWindowDimensions } from 'react-native';
import OverlayAnchor from '../components/OverlayAnchor';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';
import { Blur, Canvas, Image, makeImageFromView, } from '@shopify/react-native-skia';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export const PopoutContext = React.createContext({
    elementOpened: null,
    onElementTap: () => { },
    OverlayComponent: null,
    setOverlayComponent: () => { },
    overlayUnderNotch: true,
    setOverlayUnderNotch: () => { },
});
const PopoutRootView = ({ children }) => {
    const [elementOpened, setElementOpened] = useState(null);
    const [OverlayComponent, setOverlayComponent] = useState(null);
    const [overlayUnderNotch, setOverlayUnderNotch] = useState(true);
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const onElementTap = async (viewRef, popoutTileData) => {
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
    const overviewRef = useRef(null);
    const snapshot = useSharedValue(null);
    const [snapshotOrigin, setSnapshotOrigin] = useState(null);
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
    return (<PopoutContext.Provider value={{
            elementOpened,
            overlayUnderNotch,
            onElementTap,
            OverlayComponent,
            setOverlayComponent,
            setOverlayUnderNotch,
        }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View pointerEvents="box-none" ref={overviewRef} style={{ flex: 1 }}>
          <Animated.View style={animatedOverviewStyle}>
            <Pressable onPress={onClose}>
              {children}
            </Pressable>
          </Animated.View>
        </View>
        <Animated.View pointerEvents="none" style={[
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
          <Canvas style={{
            flex: 1,
        }}>
            <Image image={snapshot} fit="contain" width={snapshotOrigin?.width || 0} height={snapshotOrigin?.height || 0}>
              <Blur blur={blur}/>
            </Image>
          </Canvas>
        </Animated.View>
        {elementOpened && (<View style={{
                position: 'absolute',
                zIndex: 99,
                width: screenWidth,
                height: screenHeight,
            }}>
            <OverlayAnchor item={elementOpened} hide={onClose}>
              {OverlayComponent}
            </OverlayAnchor>
          </View>)}
      </GestureHandlerRootView>
    </PopoutContext.Provider>);
};
export default PopoutRootView;

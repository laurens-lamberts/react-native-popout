import React, { useContext } from 'react';
import { Blur, Canvas, ColorMatrix, Image, } from '@shopify/react-native-skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, useWindowDimensions } from 'react-native';
import { OVERLAY_BACKDROP_FROM_IMAGE } from '../config/settings';
import Animated, { useAnimatedStyle, } from 'react-native-reanimated';
import { PopoutContext } from '../components/PopoutRootView';
const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
const OverlayBackdrop = ({ image, blurred, opacity, }) => {
    // TODO: refactor into hook, together with the one in Overlay.tsx
    const { overlayUnderNotch } = useContext(PopoutContext);
    const safeAreaInsets = useSafeAreaInsets(); // TODO: make more generic
    const insets = overlayUnderNotch
        ? { top: 0, bottom: 0, left: 0, right: 0 }
        : safeAreaInsets;
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const dimmed = blurred;
    const viewStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: screenWidth,
        height: screenHeight - insets.top,
        backgroundColor: '#000',
    };
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: typeof opacity === 'number' ? opacity : opacity?.value,
        };
    });
    if (!OVERLAY_BACKDROP_FROM_IMAGE) {
        return <View style={viewStyle}/>;
    }
    return (<AnimatedCanvas style={[viewStyle, animatedStyle]} pointerEvents="none">
      <Image image={image} fit="cover" width={screenWidth} height={screenHeight}>
        <Blur blur={blurred ? 150 : 0} mode="clamp">
          {dimmed && (<ColorMatrix matrix={[
                0.6, 0.0, 0.0, 0.0, -0.053, 0.0, 0.6, 0.0, 0.0, -0.053, 0.0,
                0.0, 0.6, 0.0, -0.053, 0.0, 0.0, 0.0, 1.0, 0.0,
            ]} // generated with https://fecolormatrix.com/; brightness (-0.053) and exposure (0.6)
        />)}
        </Blur>
      </Image>
    </AnimatedCanvas>);
};
export default OverlayBackdrop;

import React from 'react';
import {
  Blur,
  Canvas,
  ColorMatrix,
  Image,
  SkImage,
  useImage,
} from '@shopify/react-native-skia';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, ViewStyle, useWindowDimensions} from 'react-native';
import {OVERLAY_BACKDROP_FROM_IMAGE} from '../app/config/settings';

const OverlayBackdrop = ({image}: {image: SkImage}) => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const viewStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight - insets.top,
    backgroundColor: '#000',
  };

  if (!OVERLAY_BACKDROP_FROM_IMAGE) return <View style={viewStyle} />;

  return (
    <Canvas style={viewStyle}>
      <Image
        image={image}
        fit="cover"
        width={screenWidth}
        height={screenHeight}>
        <Blur blur={150} mode="clamp">
          <ColorMatrix
            matrix={[
              0.6, 0.0, 0.0, 0.0, -0.053, 0.0, 0.6, 0.0, 0.0, -0.053, 0.0, 0.0,
              0.6, 0.0, -0.053, 0.0, 0.0, 0.0, 1.0, 0.0,
            ]} // generated with https://fecolormatrix.com/; brightness (-0.053) and exposure (0.6)
          />
        </Blur>
      </Image>
    </Canvas>
  );
};
export default OverlayBackdrop;

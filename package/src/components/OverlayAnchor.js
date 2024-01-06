import React from 'react';
import { View } from 'react-native';
import Overlay from '../screens/Overlay';
import { useImage } from '@shopify/react-native-skia';
const OverlayAnchor = ({ item, hide, children }) => {
    const skiaImage = useImage(item?.image);
    if (!skiaImage)
        return null;
    return (<View style={{
            left: item?.origin?.x,
            top: item?.origin?.y,
            width: item?.origin?.width,
            height: item?.origin?.height,
            flex: 1,
        }}>
      <Overlay item={item} hide={hide} image={skiaImage}>
        {children}
      </Overlay>
    </View>);
};
export default OverlayAnchor;

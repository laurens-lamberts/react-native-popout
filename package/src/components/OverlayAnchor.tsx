import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Overlay from '../screens/Overlay';
import { useImage } from '@shopify/react-native-skia';
import { PopoutTileType } from '../types/PopoutTile';
import { SharedValue } from 'react-native-reanimated';

interface Props {
  item: PopoutTileType;
  hide: () => void;
  panScale: SharedValue<number>;
}

const OverlayAnchor = ({
  item,
  hide,
  children,
  panScale,
}: PropsWithChildren<Props>) => {
  const skiaImage = useImage(item?.image);
  if (!skiaImage) return null;

  return (
    <View
      style={{
        left: item?.origin?.x,
        top: item?.origin?.y,
        width: item?.origin?.width,
        height: item?.origin?.height,
        flex: 1,
      }}
    >
      <Overlay item={item} hide={hide} image={skiaImage} panScale={panScale}>
        {children}
      </Overlay>
    </View>
  );
};

export default OverlayAnchor;

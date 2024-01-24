import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Overlay from '../screens/Overlay';
import { useImage } from '@shopify/react-native-skia';
import { PopoutTileType } from '../types/PopoutTile';
import { SharedValue } from 'react-native-reanimated';

interface Props {
  item?: PopoutTileType;
  panScale: SharedValue<number>;
  backdropProgress: SharedValue<number>;
}

const OverlayAnchor = ({
  item,
  children,
  panScale,
  backdropProgress,
}: PropsWithChildren<Props>) => {
  const skiaImage = useImage(item?.image);
  if (!skiaImage) {
    return null;
  }

  return (
    <View
      style={{
        left: item?.origin?.x,
        top: item?.origin?.y,
        width: item?.origin?.width,
        height: item?.origin?.height,
        flex: 1,
      }}
      pointerEvents="box-none"
    >
      <Overlay
        item={item}
        image={skiaImage}
        panScale={panScale}
        backdropProgress={backdropProgress}
      >
        {children}
      </Overlay>
    </View>
  );
};

export default OverlayAnchor;

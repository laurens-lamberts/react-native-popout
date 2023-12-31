import React from 'react';
import { View } from 'react-native';
import { TileInfo } from '../../screens/Overview';
import Overlay from '../../screens/Overlay';
import { useImage } from '@shopify/react-native-skia';

const OverlayAnchor = ({
  item,
  hide,
}: {
  item: TileInfo;
  hide: () => void;
}) => {
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
    >
      <Overlay item={item} hide={hide} image={skiaImage} />
    </View>
  );
};

export default OverlayAnchor;

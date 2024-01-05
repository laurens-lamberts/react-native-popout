import React, { RefObject, useRef } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { BORDER_RADIUS_TILE } from '../config/settings';
import { PopoutTileType } from '../types/PopoutTile';

const TILE_HEIGHT_DEFAULT = 160;
const TILE_WIDTH_DEFAULT = 108;

const PopoutTile = ({
  onTap,
  item,
  style,
}: {
  onTap: (viewRef: RefObject<Animated.View>) => void;
  item: PopoutTileType;
  style: ViewStyle;
}) => {
  const viewRef = useRef<Animated.View>(null);

  return (
    <Pressable
      style={[
        {
          height: TILE_HEIGHT_DEFAULT,
          width: TILE_WIDTH_DEFAULT,
          backgroundColor: 'white',
          borderRadius: BORDER_RADIUS_TILE,
          overflow: 'hidden',
        },
        style,
      ]}
      onPress={() => onTap(viewRef)}
    >
      {/* {!isOpened && ( */}
      <Animated.View
        entering={FadeIn.delay(200)}
        exiting={FadeOut.duration(200)} // TODO: this is not working
        ref={viewRef}
      >
        <Animated.Image
          src={item.image}
          // @ts-ignore works!
          source={undefined}
          resizeMode={'cover'}
          entering={FadeIn}
          style={{
            position: 'absolute',
            width: !!style?.width ? style.width : TILE_WIDTH_DEFAULT,
            height: !!style?.height ? style.height : TILE_HEIGHT_DEFAULT,
          }}
        />
      </Animated.View>
      {/* )} */}
    </Pressable>
  );
};

export default PopoutTile;

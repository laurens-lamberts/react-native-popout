import React, { RefObject, useRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { BORDER_RADIUS_TILE } from '../config/settings';
import { PopoutTileType } from '../types/PopoutTile';

export const TILE_HEIGHT = 160;
export const TILE_WIDTH = 108;

const TilePresentation = ({
  onTap,
  item,
}: {
  onTap: (viewRef: RefObject<Animated.View>) => void;
  item: PopoutTileType;
}) => {
  const viewRef = useRef<Animated.View>(null);

  return (
    <Pressable
      style={{
        height: TILE_HEIGHT,
        width: TILE_WIDTH,
      }}
      onPress={() => onTap(viewRef)}
    >
      {/* {!isOpened && ( */}
      <Animated.View
        entering={FadeIn.delay(200)}
        exiting={FadeOut.duration(200)} // TODO: this is not working
        style={[
          {
            backgroundColor: 'white',
            height: TILE_HEIGHT,
            width: TILE_WIDTH,
            padding: 12,
            borderRadius: BORDER_RADIUS_TILE,
            overflow: 'hidden',
          },
        ]}
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
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
          }}
        />
        {/* <Text>{item.title}</Text> */}
      </Animated.View>
      {/* )} */}
    </Pressable>
  );
};

export default TilePresentation;

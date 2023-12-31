import React, { RefObject, useRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TileInfo } from '../../screens/Overview';
import { BORDER_RADIUS_TILE, ENABLE_DEBUG_COLORS } from '../config/settings';

export const TILE_HEIGHT = 160;
export const TILE_WIDTH = 108;

const TilePresentation = ({
  onTap,
  item,
}: {
  onTap: (viewRef: RefObject<Animated.View>) => void;
  item: TileInfo;
}) => {
  const viewRef = useRef<Animated.View>(null);

  return (
    <Pressable
      style={{
        backgroundColor: ENABLE_DEBUG_COLORS ? 'orange' : undefined,
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
            backgroundColor: ENABLE_DEBUG_COLORS ? 'salmon' : 'white',
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

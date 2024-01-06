import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { BORDER_RADIUS_TILE } from '../config/settings';
const TILE_HEIGHT_DEFAULT = 160;
const TILE_WIDTH_DEFAULT = 108;
const PopoutTile = ({ onTap, item, style, children, }) => {
    const viewRef = useRef(null);
    return (<Pressable style={[
            {
                height: TILE_HEIGHT_DEFAULT,
                width: TILE_WIDTH_DEFAULT,
                backgroundColor: 'white',
                borderRadius: BORDER_RADIUS_TILE,
                overflow: 'hidden',
            },
            style,
        ]} onPress={() => onTap(viewRef)}>
      {/* {!isOpened && ( */}
      <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut.duration(200)} // TODO: this is not working
     ref={viewRef}>
        <Animated.Image source={item.image} resizeMode={'cover'} entering={FadeIn} style={{
            position: 'absolute',
            width: !!style?.width ? style.width : TILE_WIDTH_DEFAULT,
            height: !!style?.height ? style.height : TILE_HEIGHT_DEFAULT,
        }}/>
        {children}
      </Animated.View>
      {/* )} */}
    </Pressable>);
};
export default PopoutTile;

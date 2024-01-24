import React, { PropsWithChildren, RefObject, useContext, useRef } from 'react';
import { Image, Pressable, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BORDER_RADIUS_TILE } from '../config/settings';
import { PopoutTileType } from '../types/PopoutTile';
import { PopoutContext } from './PopoutRootView';

const TILE_HEIGHT_DEFAULT = 160;
const TILE_WIDTH_DEFAULT = 108;

interface Props {
  onTap: (viewRef: RefObject<Animated.View>) => void;
  item: PopoutTileType;
  style?: ViewStyle;
  fadeIn?: boolean;
  overlayUnderNotch?: boolean;
  backdropBlur?: boolean;
  backdropScale?: boolean;
}

const PopoutTile = ({
  onTap,
  item,
  style,
  children,
  fadeIn = true,
  overlayUnderNotch = true,
  backdropBlur = true,
  backdropScale = true,
}: PropsWithChildren<Props>) => {
  const viewRef = useRef<Animated.View>(null);
  const {
    setOverlayUnderNotch,
    setTileBorderRadius,
    setBackdropScale,
    setBackdropBlur,
  } = useContext(PopoutContext);

  const borderRadius = (style?.borderRadius as number) || BORDER_RADIUS_TILE;

  return (
    <Pressable
      style={[
        {
          height: TILE_HEIGHT_DEFAULT,
          width: TILE_WIDTH_DEFAULT,
          backgroundColor: 'white',
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
      ref={viewRef}
      collapsable={false}
      onPress={() => {
        setOverlayUnderNotch(overlayUnderNotch);
        setTileBorderRadius(borderRadius);
        setBackdropScale(backdropScale);
        setBackdropBlur(backdropBlur);
        onTap(viewRef);
      }}
      pointerEvents="box-only"
    >
      <Animated.View entering={fadeIn ? FadeIn.delay(200) : undefined}>
        <Image
          source={item.image}
          resizeMode={'cover'}
          style={{
            position: 'absolute',
            width: style?.width ? style.width : TILE_WIDTH_DEFAULT,
            height: style?.height ? style.height : TILE_HEIGHT_DEFAULT,
          }}
        />
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PopoutTile;

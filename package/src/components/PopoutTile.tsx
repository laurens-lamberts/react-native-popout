import React, { FC, ReactNode, useContext, useRef } from 'react';
import { Image, Pressable, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BORDER_RADIUS_TILE } from '../config/settings';
import { PopoutTileType } from '../types/PopoutTile';
import {
  CloseButtonComponentType,
  OverlayConfigType,
  PopoutContext,
} from './PopoutRootView';

const TILE_HEIGHT_DEFAULT = 160;
const TILE_WIDTH_DEFAULT = 108;

interface Props extends OverlayConfigType {
  item: PopoutTileType;
  OverlayComponent: FC;
  onTap?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
  fadeIn?: boolean;
  children?: ReactNode;
  CloseButtonComponent?: CloseButtonComponentType;
}

const PopoutTile = ({
  onTap,
  onClose,
  item,
  style,
  children,
  fadeIn = true,
  overlayUnderNotch = true,
  backdropBlur = true,
  backdropScale = true,
  hasPanHandle = true,
  dimmedOverlayBackdrop = true,
  tileOriginContainerRef,
  overlayBorderRadius,
  OverlayComponent,
  CloseButtonComponent,
}: Props) => {
  const viewRef = useRef<Animated.View>(null);
  const { onElementTap } = useContext(PopoutContext);

  const borderRadius =
    typeof style?.borderRadius === 'number'
      ? style.borderRadius
      : BORDER_RADIUS_TILE;

  return (
    <Pressable
      style={[
        {
          height: TILE_HEIGHT_DEFAULT,
          width: TILE_WIDTH_DEFAULT,
          // backgroundColor: 'white',
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
      ref={viewRef}
      collapsable={false}
      onPress={() => {
        onElementTap({
          viewRef,
          popoutTileData: item,
          overlayConfig: {
            tileBorderRadius: borderRadius,
            backdropScale,
            backdropBlur,
            hasPanHandle,
            dimmedOverlayBackdrop,
            tileOriginContainerRef,
            overlayBorderRadius,
            overlayUnderNotch,
          },
          OverlayComponent,
          CloseButtonComponent,
          onClose,
        });
        !!onTap && onTap();
      }}
      pointerEvents="box-only"
    >
      <Animated.View entering={fadeIn ? FadeIn.delay(200) : undefined}>
        {item.image && (
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              position: 'absolute',
              width: style?.width ? style.width : TILE_WIDTH_DEFAULT,
              height: style?.height ? style.height : TILE_HEIGHT_DEFAULT,
            }}
          />
        )}
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PopoutTile;

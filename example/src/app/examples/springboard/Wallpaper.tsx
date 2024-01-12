import {
  Blur,
  Canvas,
  Rect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';

const Wallpaper = () => {
  const {width, height} = useWindowDimensions();
  const [colors] = useState<string[]>([
    '#7A4069',
    '#FFC18E',
    '#CA4E79',
    '#513252',
  ]);
  return (
    <Canvas
      style={{
        width,
        height,
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <Rect x={0} y={0} width={width} height={height}>
        <SweepGradient c={vec(-10, 0)} colors={colors} />
        <Blur blur={10} mode="clamp" />
      </Rect>
    </Canvas>
  );
};

export default Wallpaper;

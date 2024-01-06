import { ImageSourcePropType } from 'react-native';

export type PopoutTileType = {
  id: number;
  title: string;
  image: ImageSourcePropType;
  origin?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

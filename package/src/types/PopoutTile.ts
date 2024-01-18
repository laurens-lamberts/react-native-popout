import { ImageRequireSource } from 'react-native';

export type PopoutTileType = {
  id: number;
  title: string;
  image: ImageRequireSource;
  origin?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

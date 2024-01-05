import { useMemo } from 'react';
import { getColors } from 'react-native-image-colors';

export const useImageColors = (url: string) => {
  return useMemo(() => {
    return getColors(url, {
      fallback: '#000000',
      cache: true,
      key: url,
    });
  }, [url]);
};

export const getReadableTextColorByBackground = (backgroundColor: string) => {
  const hexColor = backgroundColor.replace('#', '');
  const red = parseInt(hexColor.substr(0, 2), 16);
  const green = parseInt(hexColor.substr(2, 2), 16);
  const blue = parseInt(hexColor.substr(4, 2), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
};

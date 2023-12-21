import React, {RefObject, useMemo, useRef} from 'react';
import {Pressable, Text} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {TileInfo} from '../../screens/Overview';
import {ENABLE_DEBUG_COLORS} from '../config/settings';

export const TILE_HEIGHT = 160;
export const TILE_WIDTH = 108;

const DUMMY_IMAGES = [
  'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/df/CureforWellnessOfficialPoster.jpeg',
  'https://m.media-amazon.com/images/M/MV5BMTYzMjA3OTgxOV5BMl5BanBnXkFtZTgwMjAwMDU5NjM@._V1_FMjpg_UX1000_.jpg',
  'https://cms.giggster.com/guide/directus/assets/49134223-36d0-489e-86f3-d2f528e14236?fit=cover&width=400&quality=80',
  'https://resizing.flixster.com/lpJkDxnEFNQT1OWJjnmYfvpAHJ0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjI2NjgyOS53ZWJw',
];

const TilePresentation = ({
  onTap,
  item,
  isOpened,
}: {
  onTap: (viewRef: RefObject<Animated.View>) => void;
  item: TileInfo;
  isOpened: boolean;
}) => {
  const viewRef = useRef<Animated.View>(null);

  const imageSrc = useMemo(() => {
    return DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)];
  }, []);

  return (
    <Pressable
      style={{
        backgroundColor: ENABLE_DEBUG_COLORS ? 'orange' : undefined,
        height: TILE_HEIGHT,
        width: TILE_WIDTH,
      }}
      onPress={() => onTap(viewRef)}>
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
            borderRadius: 4,
            overflow: 'hidden',
          },
        ]}
        ref={viewRef}>
        <Animated.Image
          src={imageSrc}
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

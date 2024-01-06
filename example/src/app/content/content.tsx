import {PopoutTileType} from 'react-native-popout';

export const DATA = {
  testCollection: [
    {
      id: 0,
      title: 'Frostbite Files',
      image: require('../assets/images/DreamShaper_v6_Nordic_noir_crime_series_dvd_cover_0.jpg'),
    },
    {
      id: 1,
      title: 'Ethereal Realms: Crown of Shadows',
      image: require('../assets/images/DreamShaper_v6_fantasy_movie_dvd_cover_0.jpg'),
    },
    {
      id: 2,
      title: 'Fractured Reflections',
      image: require('../assets/images/DreamShaper_v6_psychological_thriller_movie_dvd_cover_1.jpg'),
    },
    {
      id: 3,
      title: 'Misadventures of the Unlikely',
      image: require('../assets/images/DreamShaper_v6_comedy_movie_dvd_cover_1.jpg'),
    },
    {
      id: 4,
      title: 'Cupcakes and Catastrophes',
      image: require('../assets/images/DreamShaper_v6_sitcom_dvd_cover_1.jpg'),
    },
  ],
} as {
  testCollection: PopoutTileType[];
};

export const ROWS = [
  {id: 0, title: 'Favorites'},
  {id: 1, title: 'Trending'},
  {id: 2, title: 'New'},
  // {id: 3, title: 'Coming soon'}, // TODO: glitchy when move content than screen height
];

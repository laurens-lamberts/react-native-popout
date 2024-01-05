import {PopoutTileType} from 'react-native-popout-transition';

export const DUMMY_IMAGES = [
  'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/df/CureforWellnessOfficialPoster.jpeg',
  'https://m.media-amazon.com/images/M/MV5BMTYzMjA3OTgxOV5BMl5BanBnXkFtZTgwMjAwMDU5NjM@._V1_FMjpg_UX1000_.jpg',
  'https://cms.giggster.com/guide/directus/assets/49134223-36d0-489e-86f3-d2f528e14236?fit=cover&width=400&quality=80',
  'https://resizing.flixster.com/lpJkDxnEFNQT1OWJjnmYfvpAHJ0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjI2NjgyOS53ZWJw',
];

export const DATA = {
  testCollection: [
    {
      id: 0,
      title: 'Kip',
      image: DUMMY_IMAGES[0],
    },
    {
      id: 1,
      title: 'Paard',
      image: DUMMY_IMAGES[1],
    },
    {
      id: 2,
      title: 'Koe',
      image: DUMMY_IMAGES[2],
    },
    {
      id: 3,
      title: 'Schaap',
      image: DUMMY_IMAGES[3],
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

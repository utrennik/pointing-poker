import back1 from '@assets/images/back-side-card/Clarence.svg';
import back2 from '@assets/images/back-side-card/Linth.svg';
import back3 from '@assets/images/back-side-card/Mataura.svg';
import back4 from '@assets/images/back-side-card/Aare.svg';
import back5 from '@assets/images/back-side-card/Waimakariri.svg';
import back6 from '@assets/images/back-side-card/Doubs.svg';

import { ICoverCard } from '@models/types';

export const coverCardData: ICoverCard[] = [
  {
    id: 1,
    image: back1,
    isSelected: false,
  },
  {
    id: 2,
    image: back2,
    isSelected: false,
  },
  {
    id: 3,
    image: back3,
    isSelected: false,
  },
  {
    id: 4,
    image: back4,
    isSelected: false,
  },
  {
    id: 5,
    image: back5,
    isSelected: true,
  },
  {
    id: 6,
    image: back6,
    isSelected: false,
  },
];

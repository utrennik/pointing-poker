import clarence from '@assets/images/back-side-card/clarence.svg';
import linth from '@assets/images/back-side-card/linth.svg';
import mataura from '@assets/images/back-side-card/mataura.svg';
import aare from '@assets/images/back-side-card/aare.svg';
import waimakariri from '@assets/images/back-side-card/waimakariri.svg';
import doubs from '@assets/images/back-side-card/doubs.svg';

import { ICoverCard } from '@models/types';

export const coverCardData: ICoverCard[] = [
  {
    id: 1,
    image: clarence,
    isSelected: false,
  },
  {
    id: 2,
    image: linth,
    isSelected: false,
  },
  {
    id: 3,
    image: mataura,
    isSelected: false,
  },
  {
    id: 4,
    image: aare,
    isSelected: false,
  },
  {
    id: 5,
    image: waimakariri,
    isSelected: true,
  },
  {
    id: 6,
    image: doubs,
    isSelected: false,
  },
];

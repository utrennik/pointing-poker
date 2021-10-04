import { IGameCard } from '@models/types';
import clarence from '@assets/images/back-side-card/clarence.svg';
import config from '@src/config.json';

export const gameCardData: IGameCard[] = [
  {
    gameCardID: '1',
    name: 'SP',
    value: config.PASS,
    image: clarence,
    isFlipped: false,
    isSelected: false,
  },
  {
    gameCardID: '2',
    name: 'SP',
    value: config.COFFEE,
    image: clarence,
    isFlipped: false,
    isSelected: false,
  },
  {
    gameCardID: '3',
    name: 'SP',
    value: '1',
    image: clarence,
    isFlipped: false,
    isSelected: false,
  },
  {
    gameCardID: '4',
    name: 'SP',
    value: '5',
    image: clarence,
    isFlipped: false,
    isSelected: false,
  },
  {
    gameCardID: '5',
    name: 'SP',
    value: '10',
    image: clarence,
    isFlipped: false,
    isSelected: false,
  },
];

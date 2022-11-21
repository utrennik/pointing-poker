import { IMessageCard } from '@models/types';
import blane from '@assets/images/avatars/blane.jpg';
import ross from '@assets/images/avatars/ross.jpg';
import horn from '@assets/images/avatars/horn.jpg';

const msg = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Laudantium non inventore nobis facilis perferendis, 
quam possimus, sit libero in ea nihil est beatae minus odio? 
Doloremque porro amet aliquid dolores.`;

const shortMsg = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

export const messages: IMessageCard[] = [
  {
    firstName: 'Daniel',
    lastName: 'Horn',
    avatarImage: horn,
    message: shortMsg,
    isCurrentUser: false,
  },
  {
    firstName: 'Dayana',
    lastName: 'Ross',
    avatarImage: ross,
    message: msg,
    isCurrentUser: false,
  },
  {
    firstName: 'James',
    lastName: 'Bond',
    avatarImage: '',
    message: shortMsg,
    isCurrentUser: false,
  },
  {
    firstName: 'Mark',
    lastName: 'Single',
    avatarImage: '',
    message: shortMsg,
    isCurrentUser: false,
  },
  {
    firstName: 'Jane',
    lastName: 'Ring',
    avatarImage: '',
    message: msg,
    isCurrentUser: false,
  },
  {
    firstName: 'Larry',
    lastName: 'King',
    avatarImage: '',
    message: msg,
    isCurrentUser: false,
  },
  {
    firstName: 'David',
    lastName: 'Blane',
    avatarImage: blane,
    message: shortMsg,
    isCurrentUser: true,
  },
];

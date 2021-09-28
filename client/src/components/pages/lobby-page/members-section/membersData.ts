import blane from '@assets/images/avatars/blane.jpg';
import ross from '@assets/images/avatars/ross.jpg';
import horn from '@assets/images/avatars/horn.jpg';
import { IMemberCard } from '@models/types';

export const members: IMemberCard[] = [
  {
    id: 123,
    firstName: 'David',
    lastName: 'Blane',
    role: 'Senior Software Engineer',
    avatarImage: blane,
    gameRole: 'member',
  },
  {
    id: 158,
    firstName: 'Dayana',
    lastName: 'Ross',
    role: 'Junior Software Engineer',
    avatarImage: ross,
    gameRole: 'observer',
  },
  {
    id: 546,
    firstName: 'Daniel',
    lastName: 'Horn',
    role: '',
    avatarImage: horn,
  },
  {
    id: 387,
    firstName: 'Mark',
    lastName: 'Single',
    role: 'Senior Software Engineer',
    avatarImage: '',
  },
  {
    id: 246,
    firstName: 'Jane',
    lastName: 'Ring',
    role: 'Software Engineer',
    avatarImage: '',
    gameRole: 'observer',
  },
  {
    id: 413,
    firstName: 'Larry',
    lastName: 'King',
    role: 'Junior Software Engineer',
    avatarImage: '',
  },
  {
    id: 651,
    firstName: 'Fill',
    lastName: '',
    role: 'QA Engineer',
    avatarImage: '',
    gameRole: 'observer',
  },
];

import { IIssueCardStatus, IMemberCard } from '@models/types';
import blane from '@assets/images/avatars/blane.jpg';
import ross from '@assets/images/avatars/ross.jpg';
import horn from '@assets/images/avatars/horn.jpg';

export const issuesStatus: IIssueCardStatus[] = [
  {
    id: '1',
    score: '',
    cardValueScore: 'SP',
    gameRole: 'member',
  },
  {
    id: '2',
    score: '200',
    cardValueScore: 'SP',
    gameRole: 'observer',
  },
  {
    id: '3',
    score: 'parrot',
    cardValueScore: 'SP',
    gameRole: 'member',
  },
  {
    id: '4',
    score: '600',
    cardValueScore: 'SP',
    gameRole: 'member',
  },
  {
    id: '5',
    cardValueScore: 'SP',
    gameRole: 'member',
  },
  {
    id: '6',
    score: 'medved',
    cardValueScore: 'SP',
    gameRole: 'member',
  },
  {
    id: '7',
    score: '200',
    cardValueScore: 'SP',
    gameRole: 'observer',
  },
];

export const users: IMemberCard[] = [
  {
    id: '123',
    firstName: 'David',
    lastName: 'Blane',
    role: 'Senior Software Engineer',
    avatarImage: blane,
    gameRole: 'member',
    isRemoveButtonDisabled: false,
  },
  {
    id: '158',
    firstName: 'Dayana',
    lastName: 'Ross',
    role: 'Junior Software Engineer',
    avatarImage: ross,
    gameRole: 'observer',
    isRemoveButtonDisabled: false,
  },
  {
    id: '546',
    firstName: 'Daniel',
    lastName: 'Horn',
    role: '',
    avatarImage: horn,
    gameRole: 'member',
    isRemoveButtonDisabled: false,
  },
  {
    id: '387',
    firstName: 'Mark',
    lastName: 'Single',
    role: 'Senior Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true,
  },
  {
    id: '246',
    firstName: 'Jane',
    lastName: 'Ring',
    role: 'Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true,
  },
  {
    id: '413',
    firstName: 'Larry',
    lastName: 'King',
    role: 'Junior Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true,
  },
  {
    id: '651',
    firstName: 'Fill',
    lastName: '',
    role: 'QA Engineer',
    avatarImage: '',
    gameRole: 'observer',
    isRemoveButtonDisabled: true,
  },
];

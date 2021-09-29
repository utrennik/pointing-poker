import { IIssueCardStatus, IMemberCard } from '@models/types';
import blane from '@assets/images/avatars/blane.jpg';
import ross from '@assets/images/avatars/ross.jpg';
import horn from '@assets/images/avatars/horn.jpg';

export const issuesStatus: IIssueCardStatus[] = [
  {
    id: '1',
    score: '',
    cardValueScore: 'SP',
    roleInGame: "member"
  },
  {
    id: '2',
    score: '200',
    cardValueScore: 'SP',
    roleInGame: "observer"
  },
  {
    id: '3',
    score: 'parrot',
    cardValueScore: 'SP',
    roleInGame: "member"
  },
  {
    id: '4',
    score: '600',
    cardValueScore: 'SP',
    roleInGame: "member"
  },
  {
    id: '5',
    cardValueScore: 'SP',
    roleInGame: "member"
  },
  {
    id: '6',
    score: 'medved',
    cardValueScore: 'SP',
    roleInGame: "member"
  },
  {
    id: '7',
    score: '200',
    cardValueScore: 'SP',
    roleInGame: "observer"
  },
];

export const members: IMemberCard[] = [
  {
    id: '123',
    firstName: 'David',
    lastName: 'Blane',
    role: 'Senior Software Engineer',
    avatarImage: blane,
    gameRole: 'member',
    isRemoveButtonDisabled: true
  },
  {
    id: '158',
    firstName: 'Dayana',
    lastName: 'Ross',
    role: 'Junior Software Engineer',
    avatarImage: ross,
    gameRole: 'observer',
    isRemoveButtonDisabled: true
  },
  {
    id: '546',
    firstName: 'Daniel',
    lastName: 'Horn',
    role: '',
    avatarImage: horn,
    gameRole: 'member',
    isRemoveButtonDisabled: true
  },
  {
    id: '387',
    firstName: 'Mark',
    lastName: 'Single',
    role: 'Senior Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true
  },
  {
    id: '246',
    firstName: 'Jane',
    lastName: 'Ring',
    role: 'Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true
  },
  {
    id: '413',
    firstName: 'Larry',
    lastName: 'King',
    role: 'Junior Software Engineer',
    avatarImage: '',
    gameRole: 'member',
    isRemoveButtonDisabled: true
  },
  {
    id: '651',
    firstName: 'Fill',
    lastName: '',
    role: 'QA Engineer',
    avatarImage: '',
    gameRole: 'observer',
    isRemoveButtonDisabled: true
  },
];
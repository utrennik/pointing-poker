import { IIssue } from '@models/types';

export interface IVoteResult {
  /*
   * Users round voting data
   */
  score: string;
  /*
   * Percentage of the score
   */
  percentage: number;
}

export interface IGameResult {
  /*
   * ID of the issue
   */
  issueID: string;
  /*
   * Result of the vote
   */
  voteResult: IVoteResult[];
}

export const testIssues: IIssue[] = [
  {
    id: '1',
    name: 'Issue #1',
    description:
      'Issue #1 - Full description: Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    room: '1',
    priority: 'HIGH',
    isActive: false,
    score: '20 SP',
    votingData: ['10', '20', '20', '20', '30'],
  },
  {
    id: '2',
    name: 'Issue #2',
    description:
      'Issue #2 - Full description: Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    room: '1',
    priority: 'NORMAL',
    isActive: false,
    score: '15 SP',
    votingData: ['2', '5', '20', '20', 'pass'],
  },
  {
    id: '3',
    name: 'Issue #3',
    description:
      'Issue #3 - Full description: Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    room: '1',
    priority: 'LOW',
    isActive: false,
    score: '5 SP',
    votingData: ['1', '5', '10', 'pass', 'coffee'],
  },
];

export const gameResults: IGameResult[] = [
  {
    issueID: '1',
    voteResult: [
      {
        score: '10',
        percentage: 20,
      },
      {
        score: '20',
        percentage: 60,
      },
      {
        score: '30',
        percentage: 20,
      },
    ],
  },
  {
    issueID: '2',
    voteResult: [
      {
        score: '2',
        percentage: 20,
      },
      {
        score: '5',
        percentage: 20,
      },
      {
        score: '20',
        percentage: 40,
      },
      {
        score: 'pass',
        percentage: 20,
      },
    ],
  },
  {
    issueID: '3',
    voteResult: [
      {
        score: '1',
        percentage: 20,
      },
      {
        score: '5',
        percentage: 20,
      },
      {
        score: '10',
        percentage: 20,
      },
      {
        score: 'pass',
        percentage: 20,
      },
      {
        score: 'coffee',
        percentage: 20,
      },
    ],
  },
];

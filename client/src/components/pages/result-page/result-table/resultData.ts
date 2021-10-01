export interface IGameResult {
  issueName: string;
  issueDescription: string;
  issueScore: string;
  issueScoreTypeShort: string;
}

export const gameResults: IGameResult[] = [
  {
    issueName: 'Issue #1',
    issueDescription: 'Issue #1 Description',
    issueScore: '10',
    issueScoreTypeShort: 'SP',
  },
  {
    issueName: 'Issue #2',
    issueDescription: 'Issue #2 Description',
    issueScore: '5',
    issueScoreTypeShort: 'SP',
  },
  {
    issueName: 'Issue #3',
    issueDescription: 'Issue #3 Description',
    issueScore: '8',
    issueScoreTypeShort: 'SP',
  },
  {
    issueName: 'Issue #4',
    issueDescription: 'Issue #4 Description',
    issueScore: '12',
    issueScoreTypeShort: 'SP',
  },
  {
    issueName: 'Issue #5',
    issueDescription: 'Issue #5 Description',
    issueScore: '3',
    issueScoreTypeShort: 'SP',
  },
  {
    issueName: 'Issue #6',
    issueDescription: 'Issue #6 Description',
    issueScore: '7',
    issueScoreTypeShort: 'SP',
  },
];

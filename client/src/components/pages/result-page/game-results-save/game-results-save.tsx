import '@styles/page.sass';
import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

const gameResults = [
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

export const GameResultsSave = () => (
  <div className="result-container">
    {' '}
    <ExcelFile element={<button type="button">Download Results as XLS</button>}>
      <ExcelSheet data={gameResults} name="Game Results">
        <ExcelColumn label="Issue Title" value="issueName" />
        <ExcelColumn label="Issue Description" value="issueDescription" />
        <ExcelColumn label="Score" value="issueScore" />
        <ExcelColumn label="Score Type" value="issueScoreTypeShort" />
      </ExcelSheet>
    </ExcelFile>
  </div>
);

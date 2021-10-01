import '@styles/page.sass';
import ReactExport from 'react-export-excel';
import { CSVLink } from 'react-csv';

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
    <table id="table-to-xls">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {gameResults.map((item) => (
          <tr>
            <td>{item.issueName}</td>
            <td>{item.issueDescription}</td>
            <td>{item.issueScore}</td>
            <td>{item.issueScoreTypeShort}</td>
          </tr>
        ))}
      </tbody>
    </table>{' '}
    <ExcelFile
      filename="Game Results"
      element={<button type="button">Download Results as XLSX</button>}
    >
      <ExcelSheet data={gameResults} name="Game Results">
        <ExcelColumn label="Issue Title" value="issueName" />
        <ExcelColumn label="Issue Description" value="issueDescription" />
        <ExcelColumn label="Score" value="issueScore" />
        <ExcelColumn label="Score Type" value="issueScoreTypeShort" />
      </ExcelSheet>
    </ExcelFile>
    <CSVLink filename="Game Results.csv" data={gameResults}>
      Download Results as CSV
    </CSVLink>
  </div>
);

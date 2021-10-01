import ReactExport from 'react-export-excel';
import { CSVLink } from 'react-csv';
import { Button } from '@material-ui/core';
import ResultTable from '../result-table/result-table';
import { gameResults } from '../result-table/resultData';
import './game-results-save.sass';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export const GameResultsSave = () => (
  <div className="result-container">
    <div className="result-table">
      <ResultTable />
    </div>
    <div className="result-buttons">
      <Button variant="contained" size="small" color="primary" type="submit">
        <ExcelFile filename="Game Results" element={<p>Download XLSX</p>}>
          <ExcelSheet data={gameResults} name="Game Results">
            <ExcelColumn label="Issue Title" value="issueName" />
            <ExcelColumn label="Issue Description" value="issueDescription" />
            <ExcelColumn label="Score" value="issueScore" />
            <ExcelColumn label="Score Type" value="issueScoreTypeShort" />
          </ExcelSheet>
        </ExcelFile>
      </Button>
      <Button variant="contained" size="small" color="primary" type="submit">
        <CSVLink className="csv-button" filename="Game Results.csv" data={gameResults}>
          <p> Download CSV</p>
        </CSVLink>
      </Button>
    </div>
  </div>
);

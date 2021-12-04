import { useEffect, useState } from 'react';
import ReactExport from 'react-export-excel';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Button } from '@material-ui/core';
import { IIssue, IResult } from '@models/types';
import './game-results-save.sass';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export const GameResultsSave = () => {
  const initialResultsValue: IResult[] = [];
  const [results, setResults] = useState(initialResultsValue);

  const issues: IIssue[] = useSelector((state: RootState) => state.game.issues as IIssue[]);

  const getResults = () => {
    issues.map((issue: IIssue) => {
      if (issue.score) {
        const { name, description, priority, score } = issue;

        results.push({
          name,
          description,
          priority,
          score,
        });
      }

      return results;
    });

    setResults(results);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="button-container">
      <div className="result-buttons">
        <Button variant="contained" size="small" color="primary" type="submit">
          <ExcelFile filename="Game Results" element={<p>Download XLSX</p>}>
            <ExcelSheet data={results} name="Game Results">
              <ExcelColumn label="Issue Title" value="name" />
              <ExcelColumn label="Issue Description" value="description" />
              <ExcelColumn label="Priority" value="priority" />
              <ExcelColumn label="Score" value="score" />
            </ExcelSheet>
          </ExcelFile>
        </Button>
        <Button variant="contained" size="small" color="primary" type="submit">
          <CSVLink className="csv-button" filename="Game Results.csv" data={results}>
            <p> Download CSV</p>
          </CSVLink>
        </Button>
      </div>
    </div>
  );
};

import ReactExport from 'react-export-excel';
import { CSVLink } from 'react-csv';
// import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { IIssue } from '@models/types';
import { testIssues /* gameResults, IGameResult */ } from '../game-results/vote-resultsData';
import './game-results-save.sass';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

interface IResult {
  name: string;
  description: string;
  priority: string;
  score: string;
  // TODO: Uncomment in case of implementation of statistics cards
  // voteScore: string;
}

export const GameResultsSave = () => {
  const results: IResult[] = [];

  const getResults = () => {
    // TODO: Uncomment in case of implementation of statistics cards
    // gameResults.map((gameResult: IGameResult) =>
    testIssues.map((testIssue: IIssue) => {
      // if (testIssue.id === gameResult.issueID) {
      const { name, description, priority, score } = testIssue;
      // const { voteResult } = gameResult;
      // const voteScores: Array<string> = [];
      // voteResult.map((voteResultItem) =>
      //   voteScores.push(`${voteResultItem.score}: ${voteResultItem.percentage}%`)
      // );

      // const voteScore = voteScores.join('; ');

      results.push({
        name,
        description,
        priority,
        score,
        // voteScore,
      });
      // }
      return results;
    });
    // );
  };

  getResults();

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
              {/* // TODO: Uncomment in case of implementation of statistics cards
              <ExcelColumn label="Vote Score" value="voteScore" /> */}
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

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import InputButton from '@components/ui/input-button/input-button';
import { IIssue, IRoundVoteResults } from '@models/types';
import { Button } from '@material-ui/core';
import { getVoteResults, id } from '@models/utils';
import { StatsItem } from './stats-item/stats-item.tsx';
import './game-round-section.sass';

export const GameRoundSection = () => {
  const currentIssue: IIssue = useSelector((state: RootState) => state.game.currentIssue);
  const isIssuePlayed: boolean = !!currentIssue.score;
  const voteResults: IRoundVoteResults[] = getVoteResults(currentIssue.votingData);

  const statsItems = voteResults.map((voteResultsItem: IRoundVoteResults) => (
    <StatsItem
      key={id()}
      score={voteResultsItem.score}
      percentage={voteResultsItem.percentage}
      pointsShortName="SP"
    />
  ));

  const handleSetScore = (score: string) => {
    console.log(`set current issue score: ${score}`);
  };

  return (
    <div className="round-section">
      <h3>Current issue:</h3>

      <div className="current-issue-details">
        <span>Title: </span>
        {currentIssue.name}
      </div>

      <div className="current-issue-details">
        <span>Priority: </span>
        {currentIssue.priority}
      </div>

      <div className="current-issue-details">
        <span>Description: </span>
        {currentIssue.description}
      </div>

      <div className="current-issue-details">
        <span>Score: </span>
        {currentIssue.score || '---'}
      </div>

      <div className="current-issue-score-input">
        <InputButton buttonText="Set score" valueHandler={handleSetScore} />
      </div>

      <div className="current-issue-btn">
        <Button color="primary" variant={isIssuePlayed ? 'outlined' : 'contained'}>
          {`${isIssuePlayed ? 'Replay' : 'Play'} round`}
        </Button>
      </div>

      <div className="current-issue-btn">
        <Button variant="contained">Finish round</Button>
      </div>

      <div className="current-issue-details">
        <span>Stats: </span>
        <div className="stats-items">{statsItems}</div>
      </div>
    </div>
  );
};

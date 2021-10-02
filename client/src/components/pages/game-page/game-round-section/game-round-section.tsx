import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import InputButton from '@components/ui/input-button/input-button';
import { IIssue, IRoundVoteResults } from '@models/types';
import { Button } from '@material-ui/core';
import { getVoteResults, id } from '@models/utils';
import { StatsItem } from './stats-item/stats-item';
import './game-round-section.sass';

interface IGameRoundSection {
  handleStartRound: () => void;
  handleFinishRound: () => void;
}

export const GameRoundSection = ({ handleStartRound, handleFinishRound }: IGameRoundSection) => {
  const currentIssue: IIssue = useSelector((state: RootState) => state.game.currentIssue);
  const isRoundRunning: IIssue = useSelector((state: RootState) => state.game.isRoundRunning);
  const isCurrentIssue: boolean = !!currentIssue.id;
  const isIssuePlayed: boolean = !!currentIssue.score;
  const voteResults: IRoundVoteResults[] =
    (currentIssue.votingData && getVoteResults(currentIssue.votingData)) || [];

  const handleSetScore = (score: string) => {
    console.log(`set current issue score: ${score}`);
  };

  const statsItems =
    voteResults &&
    voteResults.map((voteResultsItem: IRoundVoteResults) => (
      <StatsItem
        key={id()}
        score={voteResultsItem.score}
        percentage={voteResultsItem.percentage}
        pointsShortName="SP"
      />
    ));

  const playRoundBtn = (
    <div className="current-issue-btn">
      <Button
        color="primary"
        variant={isIssuePlayed ? 'outlined' : 'contained'}
        onClick={handleStartRound}
      >
        {`${isIssuePlayed ? 'Replay' : 'Play'} round`}
      </Button>
    </div>
  );

  const finishRoundBtn = (
    <div className="current-issue-btn">
      <Button variant="contained" onClick={handleFinishRound}>
        Finish round
      </Button>
    </div>
  );

  const statsField = (
    <div className="current-issue-details">
      <span>Stats: </span>
      <div className="stats-items">{statsItems}</div>
    </div>
  );

  const descriptionField = (
    <div className="current-issue-details">
      <span>Description: </span>
      {currentIssue.description}
    </div>
  );

  const roundField = (
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

      {currentIssue.description && descriptionField}

      <div className="current-issue-details">
        <span>Score: </span>
        {currentIssue.score || '---'}
      </div>

      <div className="current-issue-score-input">
        <InputButton buttonText="Set score" valueHandler={handleSetScore} />
      </div>

      {!isRoundRunning ? playRoundBtn : finishRoundBtn}

      {!!statsItems.length && statsField}
    </div>
  );

  return (isCurrentIssue && roundField) || null;
};

import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import InputButton from '@components/ui/input-button/input-button';
import { IIssue, ILobbySettings, IRoundVoteResults, IUserScore, Role } from '@models/types';
import { Button } from '@material-ui/core';
import { WebSocketContext } from '@models/web-socket';
import { getVoteResults, getAverageVoteResults, id } from '@models/utils';
import { StatsItem } from './stats-item/stats-item';
import './game-round-section.sass';

interface IGameRoundSection {
  handleStartRound: () => void;
  handleFinishRound: () => void;
  handleRestartRound: () => void;
}

export const GameRoundSection = ({
  handleStartRound,
  handleFinishRound,
  handleRestartRound,
}: IGameRoundSection) => {
  const currentIssue: IIssue = useSelector((state: RootState) => state.game.currentIssue);
  const isRoundRunning: boolean = useSelector((state: RootState) => state.game.isRoundRunning);
  const settings: ILobbySettings = useSelector((state: RootState) => state.game.settings);
  const issues: IIssue[] = useSelector((state: RootState) => state.game.issues);
  const isUnsolved: boolean =
    !!issues.length &&
    !!issues.filter((issue) => issue.score === undefined || issue.score === '').length;
  const isFlipped: boolean = useSelector((state: RootState) => state.game.isFlipped);
  const isTimer = settings.timer !== null;
  const isCurrentIssue: boolean = !!currentIssue.id;
  const isIssuePlayed: boolean = !!currentIssue.score;
  const currentUserScore: IUserScore[] = currentIssue.userScore;
  const voteResults: IRoundVoteResults[] = currentUserScore
    ? getVoteResults(currentUserScore.map((scoreItem: IUserScore) => scoreItem.score))
    : [];
  const averageVoteResults: number | null = currentUserScore
    ? getAverageVoteResults(currentUserScore.map((scoreItem: IUserScore) => scoreItem.score))
    : null;
  const isDealer: boolean = useSelector(
    (state: RootState) => state.client.clientUser.role === Role.DEALER
  );
  const isRevoting: boolean = !!settings.isRevoteAfterRoundEnd;

  const ws = useContext(WebSocketContext);

  const handleSetScore = (score: string) => {
    ws.requestSetScore(score);
  };

  const statsItems =
    voteResults &&
    voteResults.map((voteResultsItem: IRoundVoteResults) => (
      <StatsItem
        key={id()}
        score={voteResultsItem.score}
        percentage={voteResultsItem.percentage}
        pointsShortName={settings.unitsOfEstimation.scoreTypeShort}
      />
    ));

  const playRoundBtn = (
    <div className="current-issue-btn">
      <Button color="primary" variant="contained" onClick={handleStartRound}>
        Play round
      </Button>
    </div>
  );

  const replayRoundBtn = (
    <div className="current-issue-btn">
      <Button color="primary" variant="outlined" onClick={handleRestartRound}>
        Replay round
      </Button>
    </div>
  );

  const finishRoundBtn = (
    <div className="current-issue-btn">
      <div className="finish-round-title">Please now set score and:</div>
      <Button variant="contained" onClick={handleFinishRound} disabled={!currentIssue.score}>
        Finish round
      </Button>
    </div>
  );

  const flipCardsBtn = (
    <div className="current-issue-btn">
      <Button variant="contained" onClick={() => ws.requestFlipCards(true)}>
        Flip cards
      </Button>
    </div>
  );

  const finishGameBtn = (
    <div className="current-issue-btn">
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => ws.requestGameFinish()}
      >
        Finish game
      </Button>
    </div>
  );

  const averageScoreField = (
    <div className="current-issue-details">
      <span>Average score: </span>
      {averageVoteResults}
      {` ${settings.unitsOfEstimation.scoreTypeShort}`}
    </div>
  );

  const statsField = (
    <>
      <div className="current-issue-details">
        <span>Stats: </span>
        <div className="stats-items">{statsItems}</div>
      </div>
      {averageVoteResults !== null && averageScoreField}
    </>
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

      <div className="current-issue-details current-issue-score">
        <span>Score: </span>
        <div className="current-issue-score-value">
          {currentIssue.score
            ? `${currentIssue.score} ${settings.unitsOfEstimation.scoreTypeShort}`
            : '---'}
        </div>
      </div>

      <div className="current-issue-score-input">
        {isDealer && (
          <InputButton buttonText="Set score" valueHandler={handleSetScore} isClearOnSubmit />
        )}
      </div>
      {!isFlipped && isRoundRunning && !isTimer && isDealer && flipCardsBtn}

      {isDealer && !isRoundRunning && !isIssuePlayed && playRoundBtn}

      {isDealer && !isRoundRunning && isIssuePlayed && isRevoting && replayRoundBtn}

      {isDealer && isRoundRunning && isFlipped && finishRoundBtn}

      {!!statsItems.length && (isDealer || isFlipped) && statsField}

      {!isUnsolved && finishGameBtn}
    </div>
  );

  return (isCurrentIssue && roundField) || null;
};

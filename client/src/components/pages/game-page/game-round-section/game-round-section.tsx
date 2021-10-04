import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import InputButton from '@components/ui/input-button/input-button';
import { IIssue, ILobbySettings, IRoundVoteResults, IUserScore, Role } from '@models/types';
import { Button } from '@material-ui/core';
import { WebSocketContext } from '@models/web-socket';
import { getVoteResults, id } from '@models/utils';
import { StatsItem } from './stats-item/stats-item';
import './game-round-section.sass';

interface IGameRoundSection {
  handleStartRound: () => void;
  handleFinishRound: () => void;
}

export const GameRoundSection = ({ handleStartRound, handleFinishRound }: IGameRoundSection) => {
  const currentIssue: IIssue = useSelector((state: RootState) => state.game.currentIssue);
  const isRoundRunning: boolean = useSelector((state: RootState) => state.game.isRoundRunning);
  const settings: ILobbySettings = useSelector((state: RootState) => state.game.settings);
  const isFlipped: boolean = useSelector((state: RootState) => state.game.isFlipped);
  const isTimer = settings.timer !== null;
  const isAutoReverse = settings.IsAutoreverseCards;
  const isCurrentIssue: boolean = !!currentIssue.id;
  const isIssuePlayed: boolean = !!currentIssue.score;
  const currentUserScore: IUserScore[] = currentIssue.userScore;
  const voteResults: IRoundVoteResults[] = currentUserScore
    ? getVoteResults(currentUserScore.map((scoreItem: IUserScore) => scoreItem.score))
    : [];
  const isDealer: boolean = useSelector(
    (state: RootState) => state.client.clientUser.role === Role.DEALER
  );

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

  const flipCardsBtn = (
    <div className="current-issue-btn">
      <Button variant="contained" onClick={() => ws.requestFlipCards(true)}>
        Flip cards
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

      <div className="current-issue-details current-issue-score">
        <span>Score: </span>
        {currentIssue.score || '---'}
      </div>

      <div className="current-issue-score-input">
        {isDealer && (
          <InputButton
            buttonText="Set score"
            initialValue={currentIssue.score || ''}
            valueHandler={handleSetScore}
          />
        )}
      </div>
      {!isFlipped && isRoundRunning && !isTimer && !isAutoReverse && flipCardsBtn}

      {isDealer &&
        (!isRoundRunning ? playRoundBtn : ((isFlipped && isTimer) || !isTimer) && finishRoundBtn)}

      {!!statsItems.length && (isDealer || isFlipped) && statsField}
    </div>
  );

  return (isCurrentIssue && roundField) || null;
};

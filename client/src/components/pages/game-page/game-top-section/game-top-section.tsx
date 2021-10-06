import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { ScramMasterCard } from '@components/ui/scram-master-card/scram-master-card';
import { WebSocketContext } from '@models/web-socket';
import { IGameTopSection, IUser } from '@models/types';
import config from '@src/config.json';
import { GameTimer } from './game-timer/game-timer';
import './game-top-section.sass';

export const GameTopSection = ({ timerSecs, client }: IGameTopSection) => {
  const gameTitle: string = useSelector((state: RootState) => state.game.title);
  const { firstName, lastName, jobPosition, avatar } = useSelector(
    (state: RootState) => state.game.dealer as IUser
  );
  const isClientDealer = client.role === config.DEALER;
  const ws = useContext(WebSocketContext);

  const handleStopExitGame = () => {
    if (isClientDealer) ws.requestCancelGame();
    else ws.requestUserDelete(client.id);
  };

  return (
    <div className="game-top-section">
      <div className="game-top-section-title">{gameTitle}</div>
      <div className="game-top-section-row">
        <div className="game-top-section-dealer game-top-col">
          <ScramMasterCard
            firstName={firstName}
            lastName={lastName}
            role={jobPosition || ''}
            avatarImage={avatar}
            isScramMasterLobby={isClientDealer}
          />
        </div>

        <div className="game-top-section-timer game-top-col">
          <GameTimer timerSecs={timerSecs} />
        </div>

        <div className="game-top-section-btn game-top-col">
          <Button variant="contained" size="medium" color="primary" onClick={handleStopExitGame}>
            {isClientDealer ? 'Stop game' : 'Exit game'}
          </Button>
        </div>
      </div>
    </div>
  );
};

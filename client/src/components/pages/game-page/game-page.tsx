import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { IUser } from '@models/types';
import config from '@src/config.json';
import { GameTopSection } from './game-top-section/game-top-section';
import { GameRoundSection } from './game-round-section/game-round-section';
import { GameVotingSection } from './game-voting-section/game-voting-section';
import IssuesSection from '../lobby-page/issues-section/issues-section';
import '@styles/page.sass';
import './game-page.sass';

const GamePage = () => {
  const timerStartSecs: number = useSelector((state: RootState) => state.game.settings.timer);
  const client: IUser = useSelector((state: RootState) => state.client.clientUser);
  const isRoundRunning: boolean = useSelector((state: RootState) => state.game.isRoundRunning);
  const [totalSecs, setTotalSecs] = useState(timerStartSecs);
  const [intervalID, setIntervalID] = useState(null);
  const isClientDealer = client && client.role === config.DEALER;
  const ws = useContext(WebSocketContext);

  const onTimeOver = () => {
    console.log('The time is over');
  };

  const resetTimer = () => {
    if (intervalID) clearInterval(intervalID);
    setTotalSecs(timerStartSecs);
  };

  const startTimer = () => {
    if (intervalID) resetTimer();

    const tick = setInterval(() => {
      setTotalSecs((state) => {
        if (state <= 0) {
          clearInterval(tick);
          onTimeOver();
          return 0;
        }
        return state - 1;
      });
    }, 1000);

    setIntervalID(tick);
  };

  useEffect(() => {
    if (isRoundRunning) startTimer();
    else resetTimer();
  }, [isRoundRunning]);

  const handleStartRound = () => {
    ws.requestStartRound();
  };

  const handleFinishRound = () => {
    ws.requestFinishRound();
  };

  return (
    <main className="main">
      <div className="container content-wrapper game-page">
        <GameTopSection timerSecs={totalSecs} client={client} />
        <div className="game-round-issues-section">
          <div className="game-issues-section">
            <div className="game-page-issues">
              <IssuesSection sectionTitle={isClientDealer ? 'Select Issue:' : 'Issues:'} />
            </div>
          </div>
          <div className="game-round-section">
            <GameRoundSection
              handleStartRound={handleStartRound}
              handleFinishRound={handleFinishRound}
            />
          </div>
        </div>
        <GameVotingSection />
      </div>
    </main>
  );
};

export default GamePage;

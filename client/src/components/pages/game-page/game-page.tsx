import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { ILobbySettings, IUser, Role } from '@models/types';
import { GameTopSection } from './game-top-section/game-top-section';
import { GameRoundSection } from './game-round-section/game-round-section';
import { GameVotingSection } from './game-voting-section/game-voting-section';
import IssuesSection from '../lobby-page/issues-section/issues-section';
import '@styles/page.sass';
import './game-page.sass';

const GamePage = () => {
  const timerStartSecs: number | null = useSelector(
    (state: RootState) => state.game.settings.timer
  );
  const client: IUser = useSelector((state: RootState) => state.client.clientUser);
  const isRoundRunning: boolean = useSelector((state: RootState) => state.game.isRoundRunning);
  const settings: ILobbySettings = useSelector((state: RootState) => state.game.settings);
  const [totalSecs, setTotalSecs] = useState(timerStartSecs);
  const [intervalID, setIntervalID] = useState(null);
  const isClientDealer = client && client.role === Role.DEALER;
  const isclientVoting =
    (isClientDealer && settings.isDealerPlayer) || (client && client.role === Role.MEMBER) || false;
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
    if (isRoundRunning && settings.timer) startTimer();
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
        <div className="game-page-content">
          <div className="game-page-main-content">
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
          </div>
          {isRoundRunning && isclientVoting && <GameVotingSection />}
        </div>
      </div>
    </main>
  );
};

export default GamePage;

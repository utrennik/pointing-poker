import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { GameTopSection } from './game-top-section/game-top-section.tsx';
import '@styles/page.sass';
import './game-page.sass';

const GamePage = () => {
  const timerStartSecs: number = useSelector((state: RootState) => state.game.timer);
  const [totalSecs, setTotalSecs] = useState(timerStartSecs);
  const [intervalID, setIntervalID] = useState(null);

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

  // TODO: Buttons are just for the timer test and will be removed
  return (
    <main className="main">
      <div className="container content-wrapper game-page">
        <GameTopSection timerSecs={totalSecs} />
        <h5>Test buttons:</h5>
        <button onClick={startTimer}>Start timer</button>
        <button onClick={resetTimer}>Reset timer</button>
      </div>
    </main>
  );
};

export default GamePage;

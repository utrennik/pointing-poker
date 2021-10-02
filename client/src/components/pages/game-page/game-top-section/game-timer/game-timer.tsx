import './game-timer.sass';

interface IGameTimer {
  timerSecs: number | null;
}

export const GameTimer = ({ timerSecs }: IGameTimer) => {
  const MINUTE_SECS = 60;
  console.log(`timerSecs ${timerSecs}`);
  if (timerSecs === null) return null;

  return (
    <div className="timer-body">
      <div className="timer-section">
        <div className="timer-section-label">Mins:</div>
        {Math.floor(timerSecs / MINUTE_SECS)}
      </div>
      <div className="timer-divider">:</div>
      <div className="timer-section">
        <div className="timer-section-label">Secs:</div>
        {timerSecs % MINUTE_SECS < 10
          ? `0${timerSecs % MINUTE_SECS}`
          : `${timerSecs % MINUTE_SECS}`}
      </div>
    </div>
  );
};

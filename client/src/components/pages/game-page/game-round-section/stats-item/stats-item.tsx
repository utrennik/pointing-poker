import { IStatsItem } from '@models/types';
import coffeeSVG from '@src/assets/icons/coffee.svg';
import config from '@src/config.json';
import './stats-item.sass';

export const StatsItem = ({ score, percentage, pointsShortName }: IStatsItem) => {
  const coffeeIcon = <img src={coffeeSVG} className="coffee-icon" alt="" />;
  const statsItemValue =
    (score === config.PASS && 'PASS') ||
    (score === config.COFFEE && coffeeIcon) ||
    (score && `${score} ${pointsShortName}`);

  return (
    <div className="stats-item">
      <div className="stats-item-value">{statsItemValue}</div>
      <div className="stats-item-score">{percentage}%</div>
    </div>
  );
};

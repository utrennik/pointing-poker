import { IStatsItem } from '@models/types';
import config from '@src/config.json';
import './stats-item.sass';

export const StatsItem = ({ score, percentage, pointsShortName }: IStatsItem) => (
  <div className="stats-item">
    <div className="stats-item-value">
      {(score === config.PASS && 'PASS') ||
        (score === config.COFFEE && '?') ||
        (score && `${score} ${pointsShortName}`)}
    </div>
    <div className="stats-item-score">{percentage}%</div>
  </div>
);

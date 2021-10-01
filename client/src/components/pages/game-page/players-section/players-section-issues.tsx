import { IssueCardStatus } from '@components/ui/issue-card-status/issue-card-status';
import { issuesStatus } from './players-section-data';
import config from '../../../../config.json';

export const IssuesSection = () => {
  const issuesStatusforMembers = issuesStatus.filter((item) => item.gameRole !== config.OBSERVER);

  return (
    <div className="players-section-items">
      <div className="players-section-title">Score:</div>
      {issuesStatusforMembers.map((item) => (
        <IssueCardStatus
          key={item.id}
          id={item.id}
          score={item.score}
          cardValueScore={item.cardValueScore}
          gameRole={item.gameRole}
        />
      ))}
    </div>
  );
};

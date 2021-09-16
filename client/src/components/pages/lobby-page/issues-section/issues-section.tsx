import { IssueCard } from '@components/ui/issueCard/issueCard';
import { IssueCardCreate } from '@components/ui/issueCard/issueCreateCard';
import './issues-section.sass';

export const issues = [
  {
    name: 'Issue 1',
    priority: 'high',
    isSelected: true,
    isGame: true,
  },
  {
    name: 'Issue 2',
    priority: 'high',
    isSelected: true,
    isGame: true,
  },
  {
    name: 'Issue 3',
    priority: 'normal',
    isSelected: false,
    isGame: true,
  },
  {
    name: 'Issue 4',
    priority: 'normal',
    isSelected: true,
    isGame: true,
  },
  {
    name: 'Issue 5',
    priority: 'low',
    isSelected: false,
    isGame: false,
  },
] as const;

const IssuesSection = () => (
  <section className="lobby-content-issues">
    <h3 className="section-header">Issues:</h3>
    <div className="issues-lobby">
      {issues.map(({ name, priority, isSelected, isGame }, index) => (
        <div key={index}>
          <IssueCard name={name} priority={priority} isSelected={isSelected} isGame={isGame} />
        </div>
      ))}
      <IssueCardCreate />
    </div>
  </section>
);

export default IssuesSection;

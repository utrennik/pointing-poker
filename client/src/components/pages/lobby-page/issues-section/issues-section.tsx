import { IssueCard } from '@components/ui/issueCard/issueCard';
import { IssueCardCreate } from '@components/ui/issueCard/issueCreateCard';
import { issues } from './issuesData';
import './issues-section.sass';

const IssuesSection = () => (
  <section className="lobby-content-issues">
    <h3 className="section-header">Issues:</h3>
    <div className="issues-lobby">
      {issues.map(({ id, name, priority, isSelected, isGame }) => (
        <div key={id}>
          <IssueCard name={name} priority={priority} isSelected={isSelected} isGame={isGame} />
        </div>
      ))}
      <IssueCardCreate />
    </div>
  </section>
);

export default IssuesSection;

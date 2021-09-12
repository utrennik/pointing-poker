import { IssueCard } from '@components/issueCard/issueCard';
import { IssueCardCreate } from '@components/issueCard/issueCreateCard';
import '@styles/mainContent.sass';

export const Test = () => (
  <main className="main">
    <div
      className="container content-wrapper"
      style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center' }}
    >
      <IssueCard name="Drink Beer" priority="low"></IssueCard>
      <IssueCard name="Drink Whiskdsfsdfsdfdsf" priority="high" isSelected></IssueCard>
      <IssueCard name="Drink wine" priority="medium"></IssueCard>
      <IssueCardCreate></IssueCardCreate>
    </div>
  </main>
);

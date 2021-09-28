import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IssueCard } from '@components/ui/issueCard/issueCard';
import { IssueCardCreate } from '@components/ui/issueCard/issueCreateCard';
import { IIssue, IIssuesSection } from '@models/types';
import config from '@src/config.json';
import './issues-section.sass';

const IssuesSection = ({ sectionTitle }: IIssuesSection) => {
  const issues: IIssue[] = useSelector((state: RootState) => state.game.issues as IIssue[]);
  const isGame: boolean = useSelector((state: RootState) => state.game.gameStatus === config.POKER);
  const isDealer: boolean = useSelector(
    (state: RootState) => state.client.clientUser.role === config.DEALER
  );
  const room: string = useSelector((state: RootState) => state.game.room);

  const issuesList = issues.map(({ id, name, priority, isActive, score }) => (
    <IssueCard
      key={id}
      name={name}
      priority={priority}
      isActive={isActive}
      isDealer={isDealer}
      isGame={isGame}
      id={id}
      room={room}
      isPlayed={!!score}
    />
  ));

  return (
    <section className="lobby-content-issues">
      <h3 className="section-header">{sectionTitle}</h3>
      <div className="issues-lobby">
        {issuesList}
        <IssueCardCreate />
      </div>
    </section>
  );
};

export default IssuesSection;

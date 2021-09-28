import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { IssueCard } from '@components/ui/issueCard/issueCard';
import { IssueCardCreate } from '@components/ui/issueCard/issueCreateCard';
import { IIssue } from '@models/types';
import config from '@src/config.json';
import './issues-section.sass';

const IssuesSection = () => {
  const issues: IIssue[] = useSelector((state: RootState) => state.game.issues as IIssue[]);
  const isGame: boolean = useSelector((state: RootState) => state.game.gameStatus === config.POKER);
  const isDealer: boolean = useSelector((state: RootState) => state.client.isDealerLobby);
  const room: string = useSelector((state: RootState) => state.game.room);

  const issuesList = issues.map(({ id, name, priority, isActive }) => (
    <IssueCard
      key={id}
      name={name}
      priority={priority}
      isActive={isActive}
      isDealer={isDealer}
      isGame={isGame}
      id={id}
      room={room}
    />
  ));

  return (
    <section className="lobby-content-issues">
      <h3 className="section-header">Issues:</h3>
      <div className="issues-lobby">
        {issuesList}
        <IssueCardCreate />
      </div>
    </section>
  );
};

export default IssuesSection;

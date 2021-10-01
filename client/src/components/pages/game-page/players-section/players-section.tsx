import { MemberCard } from '@components/ui/memberCard/memberCard';
import { IssuesSection } from '@components/pages/game-page/players-section/players-section-issues';
import { users } from './players-section-data';
import config from '../../../../config.json';
import './players-section.sass';

export const PlayersSection = () => {
  // TODO: select data from socket,score and put members

  const stylePropsPlayers = {
    widthCard: '190px',
    heightCard: '50px',
    widthHeader: '110px',
    widthAvatar: '30px',
    heightAvatar: '30px',
    nameTruncate: 10,
    roleTruncate: 20,
    titleTypography: 'h6',
    subtitleTypography: 'subtitle2',
  };

  const usersMember = users.filter((item) => item.gameRole === config.MEMBER);
  const usersObrerver = users.filter((item) => item.gameRole === config.OBSERVER);

  return (
    <div className="players-section">
      <IssuesSection />
      <div className="players-section-items">
        <div className="players-section-title">Players:</div>
        {usersMember.map((item) => (
          <MemberCard
            key={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            id={item.id}
            role={item.role}
            isRemoveButtonDisabled={item.isRemoveButtonDisabled}
            stylesProps={stylePropsPlayers}
            gameRole={item.gameRole}
          />
        ))}
        <div className="players-section-title">Observers:</div>
        {usersObrerver.map((item) => (
          <MemberCard
            key={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            id={item.id}
            role={item.role}
            isRemoveButtonDisabled={item.isRemoveButtonDisabled}
            stylesProps={stylePropsPlayers}
            gameRole={item.gameRole}
          />
        ))}
      </div>
    </div>
  );
};

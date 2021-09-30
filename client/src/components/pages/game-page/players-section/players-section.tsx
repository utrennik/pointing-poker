import { IssueCardStatus } from '@components/ui/issue-card-status/issue-card-status';
import { MemberCard } from '@components/ui/memberCard/memberCard';
import { issuesStatus, members } from './players-section-data';
import './players-section.sass';

export const PlayersSection = () => {
  // TODO: select data from socket,score and put to issues and members

  const stypePropsPlayers = {
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

  return (
    <div className="players-section">
      <div className="players-section-items">
        <div className="players-section-title">Score:</div>
        {issuesStatus
          .filter((item) => item.roleInGame !== 'observer')
          .map((item) => (
            <IssueCardStatus
              key={item.id}
              id={item.id}
              score={item.score}
              cardValueScore={item.cardValueScore}
              roleInGame={item.roleInGame}
            />
          ))}
      </div>
      <div className="players-section-items">
        <div className="players-section-title">Players:</div>
        {members
          .filter((item) => item.gameRole === 'member')
          .map((item) => (
            <MemberCard
              key={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              id={item.id}
              role={item.role}
              isRemoveButtonDisabled={item.isRemoveButtonDisabled}
              stylesProps={stypePropsPlayers}
              gameRole={item.gameRole}
            />
          ))}
        <div className="players-section-title">Observers:</div>
        {members
          .filter((item) => item.gameRole === 'observer')
          .map((item) => (
            <MemberCard
              key={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              id={item.id}
              role={item.role}
              isRemoveButtonDisabled={item.isRemoveButtonDisabled}
              stylesProps={stypePropsPlayers}
              gameRole={item.gameRole}
            />
          ))}
      </div>
    </div>
  );
};

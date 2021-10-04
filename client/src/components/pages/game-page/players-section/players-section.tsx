import { useSelector } from 'react-redux';
import { MemberCard } from '@components/ui/memberCard/memberCard';
import { ScoreSection } from '@components/pages/game-page/players-section/score-section';
import { RootState } from 'src/redux/store';
import { IUser, Role } from '@models/types';
import config from '@src/config.json';
import './players-section.sass';

export const PlayersSection = () => {
  // TODO: select data from socket,score and put members
  const users: IUser[] = useSelector((state: RootState) => state.game.users);
  const isDealer: boolean = useSelector(
    (state: RootState) => state.client.clientUser.role === Role.DEALER
  );
  const showKickButtons: boolean = isDealer || users.length >= config.USER_DELETE_QUORUM;

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

  const members = users.filter((user) => user.role === Role.MEMBER);
  const observers = users.filter((user) => user.role === Role.OBSERVER);

  const MembersTable = (
    <>
      <div className="players-section-title">Players:</div>
      {members.map((user: IUser) => (
        <MemberCard
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          id={user.id}
          role={user.role}
          isRemoveButtonDisabled={!showKickButtons}
          stylesProps={stylePropsPlayers}
          gameRole={user.role}
          avatarImage={user.avatar}
        />
      ))}
    </>
  );

  const ObserversTable = (
    <>
      <div className="players-section-title">Observers:</div>
      {observers.map((user) => (
        <MemberCard
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          id={user.id}
          role={user.role}
          isRemoveButtonDisabled={!showKickButtons}
          stylesProps={stylePropsPlayers}
          gameRole={user.role}
          avatarImage={user.avatar}
        />
      ))}
    </>
  );

  return (
    <div className="players-section">
      {!!users.length && <ScoreSection />}
      <div className="players-section-items">
        {!!members.length && MembersTable}
        {!!observers.length && ObserversTable}
      </div>
    </div>
  );
};

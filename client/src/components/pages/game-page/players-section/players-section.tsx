import { members } from '@components/pages/lobby-page/members-section/membersData';
import { MemberCard } from '@components/ui/memberCard/memberCard';
import { IUser } from '@models/types';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './players-section.sass';

export const PlayersSection = () => {
  // const users = useSelector((state: RootState) => state.game.users as IUser[]);

  const stypePropsPlayers = {
    widthCard: '190px',
    heightCard: '50px',
    widthHeader: "110px",
    widthAvatar: "30px",
    heightAvatar: "30px",
    nameTruncate: 10,
    roleTruncate: 20,
    titleTypography: "h6",
    subtitleTypography: "subtitle2",
  }



  return (




  <div className="players-section">
    <div className = "players-section-title">Players:</div>
    {members.map((item) => (
      <MemberCard
        firstName={item.firstName}
        lastName={item.lastName}
        id={item.id}
        role={item.role}
        isRemoveButtonDisabled={item.isRemoveButtonDisabled}
        stylesProps={stypePropsPlayers}
      />
    ))}
  </div>
  )
};

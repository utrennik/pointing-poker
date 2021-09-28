import { MemberCard } from '@components/ui/memberCard/memberCard';
import { RootState } from 'src/redux/store';
import { IMembersSection, IUser } from '@models/types';
import { useSelector } from 'react-redux';
import './members-section.sass';
import config from '@src/config.json';

const MembersSection = ({ isDealerLobby }: IMembersSection) => {
  const members: IUser[] = useSelector((state: RootState) => state.game.users as IUser[]);
  return (
    <section className="lobby-content-members">
      <h3 className="section-header">Members:</h3>
      <div className="members-lobby">
        {members.map(({ id, firstName, lastName, jobPosition, avatar, role }) => (
          <div key={id}>
            <MemberCard
              firstName={firstName}
              lastName={lastName}
              role={jobPosition || ''}
              avatarImage={avatar}
              id={id}
              gameRole={role}
              isRemoveButtonDisabled={!isDealerLobby && members.length < config.USER_DELETE_QUORUM}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;

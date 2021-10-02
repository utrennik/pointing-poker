import { MemberCard } from '@components/ui/memberCard/memberCard';
import { IMembersSection, IUser } from '@models/types';
import config from '@src/config.json';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './members-section.sass';

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

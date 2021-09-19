import { MemberCard } from '@components/ui/memberCard/memberCard';
import { RootState } from 'src/redux/store';
import { IUser } from '@models/types';
import { useSelector } from 'react-redux';
import './members-section.sass';

const MembersSection = () => {
  const members: IUser[] = useSelector((state: RootState) => state.game.users as IUser[]);

  return (
    <section className="lobby-content-members">
      <h3 className="section-header">Members:</h3>
      <div className="members-lobby">
        {members.map(({ id, firstName, lastName, jobPosition, avatar }) => (
          <div key={id}>
            <MemberCard
              firstName={firstName}
              lastName={lastName}
              role={jobPosition || ''}
              avatarImage={avatar}
              id={id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;

import { MemberCard } from '@components/ui/memberCard/memberCard';
import { members } from './membersData';
import './members-section.sass';

const MembersSection = () => (
  <section className="lobby-content-members">
    <h3 className="section-header">Members:</h3>
    <div className="members-lobby">
      {members.map(({ id, firstName, lastName, role, avatarImage }) => (
        <div key={id}>
          <MemberCard
            firstName={firstName}
            lastName={lastName}
            role={role}
            avatarImage={avatarImage}
          />
        </div>
      ))}
    </div>
  </section>
);

export default MembersSection;

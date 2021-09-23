import { MemberCard } from '@components/ui/memberCard/memberCard';
import { IMembersSection } from '@models/types';
import './members-section.sass';
import config from '@src/config.json';

const MembersSection = ({ isDealerLobby, members }: IMembersSection) => (
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
            isRemoveButtonDisabled={!isDealerLobby && members.length < config.USER_DELETE_QUORUM}
          />
        </div>
      ))}
    </div>
  </section>
);

export default MembersSection;

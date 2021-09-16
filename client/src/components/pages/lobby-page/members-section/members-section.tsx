import { MemberCard } from '@components/ui/memberCard/memberCard';
import './members-section.sass';

import blane from '@assets/images/avatars/blane.jpg';
import ross from '@assets/images/avatars/ross.jpg';
import horn from '@assets/images/avatars/horn.jpg';

export const members = [
  {
    firstName: 'David',
    lastName: 'Blane',
    role: 'Senior Software Engineer',
    avatarImage: blane,
  },
  {
    firstName: 'Dayana',
    lastName: 'Ross',
    role: 'Junior Software Engineer',
    avatarImage: ross,
  },
  {
    firstName: 'Daniel',
    lastName: 'Horn',
    role: '',
    avatarImage: horn,
  },
  {
    firstName: 'Mark',
    lastName: 'Single',
    role: 'Senior Software Engineer',
    avatarImage: '',
  },
  {
    firstName: 'Jane',
    lastName: 'Ring',
    role: 'Software Engineer',
    avatarImage: '',
  },
  {
    firstName: 'Larry',
    lastName: 'King',
    role: 'Junior Software Engineer',
    avatarImage: '',
  },
  {
    firstName: 'Fill',
    lastName: '',
    role: 'QA Engineer',
    avatarImage: '',
  },
];

const MembersSection = () => (
  <section className="lobby-content-members">
    <h3 className="section-header">Members:</h3>
    <div className="members-lobby">
      {members.map(({ firstName, lastName, role, avatarImage }, index) => (
        <div key={index}>
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

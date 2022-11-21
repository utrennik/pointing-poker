import { ScramMasterCard } from '@components/ui/scram-master-card/scram-master-card';
import { render } from '@testing-library/react';

const mockData = {
  role: 'scrum master',
  firstName: 'Alehandro',
  lastName: 'Sanchezzz',
  isScramMasterLobby: false,
};

describe('ScramMaster card ', () => {
  it('should have title', () => {
    const { getByText } = render(
      <ScramMasterCard
        role={mockData.role}
        firstName={mockData.firstName}
        lastName={mockData.lastName}
        isScramMasterLobby={mockData.isScramMasterLobby}
      />
    );

    const title = getByText(/Alehandro/i);
    expect(title).toHaveClass('MuiCardHeader-title');
  });
  it('should have avatar', () => {
    const { getAllByText } = render(
      <ScramMasterCard
        role={mockData.role}
        firstName={mockData.firstName}
        lastName={mockData.lastName}
        isScramMasterLobby={mockData.isScramMasterLobby}
      />
    );
    const avatar = getAllByText(/AS/i)[0];
    expect(avatar).toHaveClass('MuiAvatar-circular');
  });
});

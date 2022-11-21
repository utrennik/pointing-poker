import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { render, screen } from '@testing-library/react';

describe('CustomAvatar', () => {
  const mockData = {
    firstName: 'Dima',
    lastName: 'Lulu',
  };

  it('should have name', () => {
    render(<CustomAvatar firstName={mockData.firstName} lastName={mockData.lastName} />);
    const avatar = screen.getByText(/DL/i);
    expect(avatar).toBeInTheDocument();
  });
});

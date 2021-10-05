import { LobbylButtons } from '@components/ui/lobby-buttons/lobby-buttons';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Lobby-buttons', () => {
  const mockData = {
    startBtnText: 'Start Game',
    cancelBtnText: 'Cancel Game',
    onStart: () => {},
    onCancel: () => {},
    disableStartGame: false,
  };

  it('should have two buttons', () => {
    const { getByText } = render(
      <LobbylButtons
        startBtnText={mockData.startBtnText}
        cancelBtnText={mockData.cancelBtnText}
        onStart={mockData.onStart}
        onCancel={mockData.onCancel}
        disableStartGame={mockData.disableStartGame}
      />
    );
    const startBtn = getByText(/Start/i);
    const cancelBtn = getByText(/Cancel/i);
    userEvent.click(startBtn);
    userEvent.click(cancelBtn);
    expect(startBtn).toBeVisible();
    expect(cancelBtn).toHaveTextContent('Cancel Game');
  });
});

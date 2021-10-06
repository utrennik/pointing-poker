import { GameCard } from '@components/ui/game-card/game-card';
import { render } from '@testing-library/react';

describe('Game card ', () => {
  const mockData = {
    gameCardID: '1',
    name: 'Sp',
    value: '5',
    image: '',
    isFlipped: false,
    onSelectedHandler: () => {},
    isSelected: false,
  };

  it('should have name and value ', () => {
    const { getByText } = render(
      <GameCard
        name={mockData.name}
        value={mockData.value}
        image={mockData.image}
        isFlipped={mockData.isFlipped}
        onSelectedHandler={mockData.onSelectedHandler}
        gameCardID={mockData.gameCardID}
        isSelected={mockData.isSelected}
      />
    );

    const cardName = getByText(/Sp/i);
    expect(cardName).toBeVisible();
  });

  it('should contain cover img', () => {
    const { getByRole } = render(
      <GameCard
        name={mockData.name}
        value={mockData.value}
        image={mockData.image}
        isFlipped
        onSelectedHandler={mockData.onSelectedHandler}
        gameCardID={mockData.gameCardID}
        isSelected={mockData.isSelected}
      />
    );

    const img = getByRole('img');
    expect(img).toHaveAttribute('alt');
  });
});

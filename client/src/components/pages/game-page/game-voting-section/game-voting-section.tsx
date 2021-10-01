import './game-voting-section.sass';

import { GameCard } from '@components/ui/game-card/game-card';
import { gameCardData } from '@components/ui/game-card/game-cardData';
import { useState } from 'react';

export const GameVotingSection = () => {
  const initialSelectedValue = '';
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSelected, setIsSelected] = useState(initialSelectedValue);

  const handleFlip = () => {
    setIsSelected(initialSelectedValue);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="game-voting-section">
      <button type="button" className="flip-test-button" onClick={handleFlip}>
        {isFlipped ? `Value` : `Cover`}
      </button>
      <div className="game-card-container">
        {gameCardData.map(({ gameCardID, name, value, image }) => (
          <GameCard
            key={gameCardID}
            gameCardID={gameCardID}
            name={name}
            value={value}
            image={image}
            isSelected={isSelected === gameCardID}
            onSelectedHandler={() => setIsSelected(gameCardID)}
            isFlipped={isFlipped}
          />
        ))}
      </div>
    </div>
  );
};

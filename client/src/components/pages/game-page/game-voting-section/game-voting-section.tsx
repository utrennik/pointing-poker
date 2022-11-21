import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { ICoverCard, IGameCardData, ILobbySettings } from '@models/types';
import { GameCard } from '@components/ui/game-card/game-card';
import './game-voting-section.sass';

export const GameVotingSection = () => {
  const settings: ILobbySettings = useSelector((state: RootState) => state.game.settings);
  const isFlipped: boolean = useSelector((state: RootState) => state.game.isFlipped);
  const cardsUnits: string = settings.unitsOfEstimation.scoreTypeShort;
  const cardsCover: ICoverCard = settings.coverCardforServer;
  const [selectedCardValue, setSelectedCardValue] = useState('');
  const { cardSet } = settings;
  const ws = useContext(WebSocketContext);

  const handleCardSelect = (value: string) => {
    setSelectedCardValue(value);
    ws.requestRoundVote(value);
  };

  const gameCardData: IGameCardData[] = cardSet.map((cardValue: string) => {
    const card: IGameCardData = {
      name: cardsUnits,
      value: cardValue,
      image: cardsCover.image,
    };
    return card;
  });

  return (
    <div className="game-voting-section">
      <div className="game-card-container">
        {gameCardData.map(({ name, value, image }) => (
          <GameCard
            key={value}
            name={name}
            value={value}
            image={image}
            isSelected={value === selectedCardValue}
            onSelectedHandler={handleCardSelect}
            isFlipped={isFlipped}
          />
        ))}
      </div>
    </div>
  );
};

// import { useSelector } from 'react-redux';
// import { RootState } from 'src/redux/store';
// import { IUser } from '@models/types';
// import coffeeSVG from '@src/assets/icons/coffee.svg';
// import config from '@src/config.json';
import './game-voting-section.sass';

import { GameCard } from '@components/ui/game-card/game-card';
import { gameCardData } from '@components/ui/game-card/game-cardData';
import { useState } from 'react';

export const GameVotingSection = () => {
  // const client: IUser = useSelector((state: RootState) => state.client.clientUser);
  // const isGamer = client.role === config.DEALER || client.role === config.MEMBER;
  // const coffeeIcon = <img src={coffeeSVG} className="coffee-icon" alt="" />;
  // const statsItemValue =
  //   (score === config.PASS && 'PASS') ||
  //   (score === config.COFFEE && coffeeIcon) ||
  //   (score && `${score} ${pointsShortName}`);
  const initialSelectedValue = '';
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSelected, setIsSelected] = useState(initialSelectedValue);

  const handleFlip = () => {
    setIsSelected(initialSelectedValue);
    setIsFlipped(!isFlipped);
  };

  return (
    // isGamer && (
    <div className="game-voting-section">
      <button className="flip-test-button" onClick={handleFlip}>
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
    // )
  );
};

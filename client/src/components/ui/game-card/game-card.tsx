import { useState } from 'react';
import { Card, CardMedia } from '@material-ui/core';
import { CardValue, IGameCard } from '@models/types';
import coffeeIcon from '@assets/icons/coffee.svg';
import './game-card.sass';

export const GameCard = ({
  name,
  value,
  image,
  isFlipped,
  isSelected,
  onSelectedHandler,
}: IGameCard) => {
  const [isRaised, setIsRaised] = useState(false);
  const coffeeImg = <img src={coffeeIcon} alt="" className="card-icon" />;

  const handleHover = () => {
    setIsRaised(!isRaised);
  };

  return (
    <Card
      className={isRaised ? `game-card-hover` : `game-card`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={onSelectedHandler}
      raised={isRaised}
    >
      {isFlipped ? (
        <CardMedia component="img" alt="cover card" height="160" image={image} />
      ) : (
        <>
          <div className="game-card-name">{name}</div>
          <div className="game-card-value">{value === CardValue.COFFEE ? coffeeImg : value}</div>
          {isSelected && (
            <div className="game-card-select-bg-color">
              <div className="game-card-select-icon" />
            </div>
          )}
        </>
      )}
    </Card>
  );
};

import { Card, CardMedia, makeStyles } from '@material-ui/core';
import { ICoverCard } from '@models/types';
import './cover-card.sass';

interface StyleProps {
  isSelected: boolean;
}

const useStyles = makeStyles({
  card: {
    backgroundColor: ({ isSelected }: StyleProps) => (isSelected ? '$green-select' : 'none'),
  },
});

export const CoverCard = ({ coverCardID, image, isSelected, handleClick }: ICoverCard) => {
  const classes = useStyles({ isSelected });
  const coverCardStyles = `cover-card ${classes.card}`;

  return (
    <Card key={coverCardID} className={coverCardStyles} onClick={() => handleClick!(coverCardID)}>
      <div className="cover-card-image">
        <CardMedia component="img" alt="cover card" height="160" image={image} />
        {isSelected && (
          <div className="cover-card-select-bg-color">
            <div className="cover-card-select-icon" />
          </div>
        )}
      </div>
    </Card>
  );
};

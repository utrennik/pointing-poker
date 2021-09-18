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

export const CoverCard = ({ id, image, isSelected }: ICoverCard) => {
  const classes = useStyles({ isSelected });
  const coverCardStyles = `cover-card ${classes.card}`;

  const handleSelect = () => {
    console.log(isSelected);
  };

  return (
    <Card key={id} className={coverCardStyles} onClick={handleSelect}>
      <div className="cover-card-image">
        <CardMedia component="img" alt="cover card" height="160" image={image} />
        {isSelected && (
          <div className="cover-card-select-bg-color">
            <div className="cover-card-select-icon"></div>
          </div>
        )}
      </div>
    </Card>
  );
};

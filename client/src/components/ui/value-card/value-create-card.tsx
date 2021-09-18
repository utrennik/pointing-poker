import { Card, IconButton } from '@material-ui/core';
import './value-card.sass';

export const ValueCreateCard = () => {
  const handleAddCoverCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card className="value-card">
      <IconButton className="value-card-add-btn" onClick={handleAddCoverCard} />
    </Card>
  );
};

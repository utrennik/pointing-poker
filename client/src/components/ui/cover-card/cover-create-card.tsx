import { Card, IconButton } from '@material-ui/core';
import './cover-card.sass';

export const CoverCreateCard = () => {
  const handleAddCoverCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card className="cover-card">
      <IconButton className="cover-card-add-btn" onClick={handleAddCoverCard} />
    </Card>
  );
};

import { Card, IconButton } from '@material-ui/core';
import { valueCardData } from '@components/ui/value-card/value-cardData';
import './value-card.sass';

export const ValueCreateCard = () => {
  const handleAddValueCard = () => {
    valueCardData.push({ name: '', value: '' });
    console.log('renderNewCoverCard', valueCardData);
  };

  return (
    <Card className="value-card">
      <IconButton className="value-card-add-btn" onClick={handleAddValueCard} />
    </Card>
  );
};

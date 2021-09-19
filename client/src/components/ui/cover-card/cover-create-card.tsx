import { Card, /* CardMedia, */ IconButton, styled } from '@material-ui/core';
import { ChangeEvent, /* useEffect, */ useState } from 'react';
import { coverCardData } from '@components/ui/cover-card/cover-cardData';

import './cover-card.sass';

export const CoverCreateCard = () => {
  const Input = styled('input')({
    display: 'none',
  });

  const [cover, setCover] = useState('');
  const handleAddCoverCard = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setCover(reader.result as string);
      };
    }
  };

  const renderNewCoverCard = () => {
    coverCardData.push({ id: cover, image: cover, isSelected: false });
    console.log('renderNewCoverCard', coverCardData);
  };

  return (
    <Card className="cover-card">
      <label htmlFor="icon-button-file">
        {cover && renderNewCoverCard()}
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleAddCoverCard} />
        <IconButton className="cover-card-add-btn" aria-label="upload picture" component="span" />
      </label>
    </Card>
  );
};

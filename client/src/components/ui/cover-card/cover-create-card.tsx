import { Card, IconButton, styled } from '@material-ui/core';
import { ICreateCoverProps } from '@models/types';

import './cover-card.sass';

export const CoverCreateCard = (props: ICreateCoverProps) => {
  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Card className="cover-card">
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => props.onCreateCoverHandler(e)}
        />
        <IconButton className="cover-card-add-btn" aria-label="upload picture" component="span" />
      </label>
    </Card>
  );
};

import { Card, IconButton } from '@material-ui/core';
import { ICreateCoverProps } from '@models/types';

import './cover-card.sass';

export const CoverCreateCard = (props: ICreateCoverProps) => (
  <Card className="cover-card">
    <label htmlFor="icon-button-file">
      <input
        className="invisible"
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={(e) => props.onCreateCoverHandler(e)}
      />
    </label>
    <IconButton className="cover-card-add-btn" aria-label="upload picture" component="span" />
  </Card>
);

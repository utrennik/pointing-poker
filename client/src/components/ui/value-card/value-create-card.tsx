import { Card, IconButton } from '@material-ui/core';
import { ICreateValueProps } from '@models/types';
import './value-card.sass';

export const ValueCreateCard = (props: ICreateValueProps) => (
  <Card className="value-card">
    <IconButton className="value-card-add-btn" onClick={() => props.onCreateValueHandler()} />
  </Card>
);

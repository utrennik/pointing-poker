import { Card, CardActions, IconButton } from '@material-ui/core';
import { IValueCard } from '@models/types';
import { ChangeEvent, useState } from 'react';
import { DarkerDisabledTextField } from '../title-planning/title-planning.tsx';
import './value-card.sass';

export const ValueCard = ({ id, name, value }: IValueCard) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleOnChange = (event: ChangeEvent<any>) => {
    setNewValue(event.target.value);
  };

  const handleOnBlur = () => {
    setIsEditable(false);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card key={id} className="value-card">
      <div className="value-card-name">{name}</div>
      <div className="value-card-value">
        <DarkerDisabledTextField
          id="card-value"
          disabled={!isEditable}
          size="small"
          value={newValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>
      <div className="value-card-edit-delete">
        <CardActions>
          <IconButton className="value-card-edit-btn" onClick={handleEdit} />
          <IconButton className="value-card-delete-btn" onClick={handleDelete} />
        </CardActions>
      </div>
    </Card>
  );
};

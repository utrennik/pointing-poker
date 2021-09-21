import { ChangeEvent, useState } from 'react';
import { Card, CardActions, IconButton } from '@material-ui/core';
import { IValueCard } from '@models/types';
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

  return (
    <Card key={id} className="value-card">
      <div className="value-card-name">{name}</div>
      <div className="value-card-value">
        <DarkerDisabledTextField
          id="card-value"
          disabled={!isEditable}
          autoComplete="off"
          size="small"
          value={newValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>
      <div className="value-card-edit-delete">
        <CardActions>
          <IconButton className="value-card-edit-btn" onClick={handleEdit} />
        </CardActions>
      </div>
    </Card>
  );
};

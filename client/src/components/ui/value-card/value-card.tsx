import { ChangeEvent, useState } from 'react';
import { Card, CardActions, IconButton } from '@material-ui/core';
import { IValueCard } from '@models/types';
import { DarkerDisabledTextField } from '../title-planning/title-planning';
import './value-card.sass';

export const ValueCard = ({ valueCardID, name, value, handleDataFromValueCard }: IValueCard) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const cardName = valueCardID !== '1' && valueCardID !== '2' && name.match(/^.{1,3}/);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleOnChange = (event: ChangeEvent<any>) => {
    handleDataFromValueCard!(event.target.value, +valueCardID!);

    setNewValue(event.target.value);
  };

  const handleOnBlur = () => {
    setIsEditable(false);
  };

  return (
    <Card key={valueCardID} className="value-card">
      <div className="value-card-name">{cardName}</div>
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
          {valueCardID !== '1' && valueCardID !== '2' && (
            <IconButton className="value-card-edit-btn" onClick={handleEdit} />
          )}
        </CardActions>
      </div>
    </Card>
  );
};

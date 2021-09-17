import { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './title-planning.sass';
import { IconButton, withStyles } from '@material-ui/core';

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
  },
})(TextField);

const TitlePlaning = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState('');

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleOnChange = (event: ChangeEvent<any>) => {
    setTitle(event.target.value);
  };

  const handleOnBlur = () => {
    setIsEditable(false);
  };

  return (
    <div className="title-planning">
      <DarkerDisabledTextField
        id="title-planning"
        label="Add title for planning:"
        disabled={!isEditable}
        fullWidth={true}
        size="small"
        value={title}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <IconButton className="title-planning-edit-btn" onClick={handleEdit} />
    </div>
  );
};

export default TitlePlaning;

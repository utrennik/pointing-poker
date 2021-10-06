import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { IInputButtonProps } from '@models/types';
import './input-button.sass';

const InputButton = ({
  buttonText,
  valueHandler,
  inputLabel = '',
  initialValue = '',
  isClearOnSubmit = false,
}: IInputButtonProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputValue(value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    valueHandler(inputValue);
    if (isClearOnSubmit) setInputValue('');
  };

  return (
    <form className="input-button-form" onSubmit={submitHandler}>
      <div className="input-button-input">
        <TextField
          label={inputLabel}
          variant="outlined"
          value={inputValue}
          onChange={inputHandler}
        />
      </div>
      <div className="input-button-button">
        <Button variant="contained" size="medium" color="primary" type="submit">
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default InputButton;

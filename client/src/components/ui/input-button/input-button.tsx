import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { IInputButtonProps } from '@models/types';
import './input-button.sass';

const InputButton = ({ buttonText, valueHandler }: IInputButtonProps) => {
  const [inputValue, setInputValue] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputValue(value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    valueHandler(inputValue);
  };

  return (
    <form className="input-button-form" onSubmit={submitHandler}>
      <div className="input-button-input">
        <TextField label="URL" variant="outlined" value={inputValue} onChange={inputHandler} />
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

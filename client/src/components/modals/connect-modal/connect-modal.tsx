import { ChangeEvent, useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import './connect-modal.sass';

const ConnectModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');

  const clearForm = () => {
    setFirstName('');
  };

  useEffect(() => {
    if (!isOpen) clearForm();
  }, [isOpen]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case 'firstName': {
        setFirstName(inputValue);
        break;
      }
      default:
    }
  };

  const confirmHandler = () => {
    console.log('confirm');
  };

  const modalBody = (
    <div>
      <div className="input-modal">
        <TextField
          label="First name"
          name="firstName"
          variant="outlined"
          autoComplete="off"
          fullWidth
          value={firstName}
          onChange={inputHandler}
        />
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={confirmHandler}
      title="Connect to lobby"
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default ConnectModal;

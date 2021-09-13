import { ChangeEvent, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { IConnectModalErrors } from '@models/types';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import './connect-modal.sass';

const ConnectModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [connectAsObs, setConnectAsObs] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState({} as IConnectModalErrors);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setJobPosition('');
    setConnectAsObs(false);
    setErrors({} as IConnectModalErrors);
  };

  const validate = () => {
    if (firstName === '') {
      setErrors({ ...errors, firstNameError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.firstNameError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (!isOpen) clearForm();
  }, [isOpen]);

  useEffect(() => {
    validate();
  }, [firstName, lastName, jobPosition, connectAsObs, avatar]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case 'first-name': {
        setFirstName(inputValue);
        break;
      }

      case 'last-name': {
        setLastName(inputValue);
        break;
      }

      case 'job-position': {
        setJobPosition(inputValue);
        break;
      }

      case 'avatar-image': {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {
            setAvatar(reader.result as string);
          };
        }
        break;
      }

      default:
    }
  };

  const handleConfirm = () => {
    console.log('confirm');
  };

  const modalBody = (
    <div>
      <div className="text-inputs-connect-modal">
        <div className="input-modal">
          <TextField
            label="Your first name"
            name="first-name"
            autoComplete="off"
            fullWidth
            value={firstName}
            onChange={handleInput}
            error={errors.firstNameError === true}
          />
        </div>

        <div className="input-modal">
          <TextField
            label="Your last name"
            name="last-name"
            autoComplete="off"
            fullWidth
            value={lastName}
            onChange={handleInput}
          />
        </div>

        <div className="input-modal">
          <TextField
            label="Your job position"
            name="job-position"
            autoComplete="off"
            fullWidth
            value={jobPosition}
            onChange={handleInput}
          />
        </div>
      </div>

      <div className="avatar-modal">
        <div className="avatar-image">
          <CustomAvatar firstName={firstName || 'N'} lastName={lastName} avatarImage={avatar} />
        </div>

        <div className="avatar-input">
          <input
            id="avatar-upload"
            accept="image/*"
            name="avatar-image"
            type="file"
            style={{ display: 'none' }}
            onInput={handleInput}
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span">
              Upload avatar
            </Button>
          </label>
        </div>
      </div>

      <div className="switch-modal">
        <div className="switch-modal-switch">
          <Switch
            id="connect-as-obs-switch"
            checked={connectAsObs}
            color="primary"
            onChange={() => setConnectAsObs(!connectAsObs)}
          />
        </div>
        <div className="switch-modal-label">Connect as Observer</div>
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Connect to lobby"
      disableConfirm={!!Object.keys(errors).length}
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default ConnectModal;

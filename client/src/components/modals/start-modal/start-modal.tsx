import { ChangeEvent, useState, useEffect, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { CustomAvatar } from '@components/ui/customAvatar/customAvatar';
import { WebSocketContext } from '@models/web-socket';
import { id } from '@src/utils/utils';
import { IConnectModalErrors, IModalWindow } from '@models/types';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper';
import '../connect-modal/connect-modal.sass';

const StartModal = ({ isOpen, onClose }: IModalWindow) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState({} as IConnectModalErrors);
  const ws = useContext(WebSocketContext);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setJobPosition('');
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
  }, [firstName, lastName, jobPosition, avatar, isOpen]);

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
    ws.requestStartGame({
      id: id(),
      firstName,
      room: null,
      lastName,
      jobPosition,
      avatar,
      role: 'dealer',
    });
    onClose();
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
            required
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
          <CustomAvatar firstName={firstName || 'NA'} lastName={lastName} avatarImage={avatar} />
        </div>

        <div className="avatar-input">
          <input
            id="avatar-upload"
            accept="image/*"
            name="avatar-image"
            type="file"
            className="invisible"
            onInput={handleInput}
          />

          <Button variant="contained" component="span">
            Upload avatar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Start new game"
      disableConfirm={!!Object.keys(errors).length}
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default StartModal;

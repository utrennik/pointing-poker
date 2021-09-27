import { ChangeEvent, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { IEditIssueModalErrors, IIssue } from '@models/types';
import { WebSocketContext } from '@models/web-socket';
import { RootState } from '@src/redux/store';
import { id } from '@src/utils/utils';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import { issueData } from './edit-issueData';
import './edit-issue-modal.sass';

const EditIssueModal = ({ isOpen, onClose, issueID, name, priority }) => {
  const [issueName, setIssueName] = useState(name);
  const [issuePriority, setIssuePriority] = useState(priority);
  const [errors, setErrors] = useState({} as IEditIssueModalErrors);
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const ws = useContext(WebSocketContext);

  const validate = () => {
    if (!issueName) {
      setErrors({ ...errors, issueNameError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.issueNameError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    validate();
  }, [issueName, isOpen]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIssueName(event.target.value);
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setIssuePriority(event.target.value);
  };

  const handleConfirm = () => {
    const issueToUpdate: IIssue = {
      id: issueID,
      name: issueName,
      room: roomID,
      isActive: false,
      priority: issuePriority,
    };

    ws.requestUpdateIssue(issueToUpdate);
    onClose();
  };

  const modalBody = (
    <div className="issue-modal">
      <div className="text-input-issue-modal">
        <div className="input-modal">
          <TextField
            label="Title"
            name="titleIssue"
            autoComplete="off"
            fullWidth
            value={issueName}
            onChange={handleInput}
            error={errors.titleIssueError}
            required
          />
        </div>
      </div>
      <div className="select-issue-modal">
        <div className="select-modal">
          <InputLabel className="select-label" htmlFor="priority-issue">
            Set priority
          </InputLabel>
          <Select id="priority-issue" value={issuePriority} onChange={handleChange}>
            {issueData.map(({ title, value }) => (
              <MenuItem key={id()} value={value}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Edit Issue"
      disableConfirm={!!Object.keys(errors).length}
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default EditIssueModal;

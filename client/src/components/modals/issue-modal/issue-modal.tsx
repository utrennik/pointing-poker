import { ChangeEvent, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { WebSocketContext } from '@models/web-socket';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { IIssue, IIssueModalErrors, IssuePriority } from '@models/types';
import { id } from '@src/utils/utils';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper';
import { issueData } from './issueData';
import './issue-modal.sass';

interface IIssueModal {
  isOpen: boolean;
  onClose: Function;
}

const IssueModal = ({ isOpen, onClose }: IIssueModal) => {
  const [issueName, setIssueName] = useState('');
  const [issuePriority, setIssuePriority] = useState(IssuePriority.HIGH);
  const [errors, setErrors] = useState({} as IIssueModalErrors);
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const ws = useContext(WebSocketContext);

  const clearForm = () => {
    setIssueName('');
    setIssuePriority(IssuePriority.NORMAL);
    setErrors({} as IIssueModalErrors);
  };

  const validate = () => {
    if (issueName === '') {
      setErrors({ ...errors, isTitleIssueError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.isTitleIssueError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (!isOpen) clearForm();
  }, [isOpen]);

  useEffect(() => {
    validate();
  }, [issueName, isOpen]);

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueName(e.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<any>) => {
    setIssuePriority(event.target.value);
  };

  const handleConfirm = () => {
    const issueID = id();
    const newIssue: IIssue = {
      id: issueID,
      name: issueName,
      room: roomID,
      isActive: false,
      priority: issuePriority,
    };

    ws.requestAddIssue(newIssue);
    onClose();
  };

  const modalBody = (
    <div className="issue-modal">
      <div className="text-input-issue-modal">
        <div className="input-modal">
          <TextField
            label="Title"
            name="title-issue"
            autoComplete="off"
            fullWidth
            value={issueName}
            onChange={handleTitleInput}
            error={errors.isTitleIssueError}
            required
          />
        </div>
      </div>

      <div className="select-issue-modal">
        <div className="select-modal">
          <InputLabel className="select-label" htmlFor="priority-issue">
            Set priority
          </InputLabel>
          <Select id="priority-issue" value={issuePriority} onChange={handlePriorityChange}>
            {issueData.map(({ title, priority }) => (
              <MenuItem key={title} value={priority}>
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
      title="Create Issue"
      disableConfirm={!!Object.keys(errors).length}
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default IssueModal;

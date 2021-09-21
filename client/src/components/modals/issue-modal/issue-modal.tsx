import { ChangeEvent, useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { IIssueModalErrors, IssuePriority } from '@models/types';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import { issueData } from './issueData';
import './issue-modal.sass';

const IssueModal = ({ isOpen, onClose }) => {
  const [titleIssue, setTitleIssue] = useState('');
  const [issuePriority, setIssuePriority] = useState(IssuePriority.HIGH);
  const [errors, setErrors] = useState({} as IIssueModalErrors);

  const clearForm = () => {
    setTitleIssue('');
    setIssuePriority(IssuePriority.HIGH);
    setErrors({} as IIssueModalErrors);
  };

  const validate = () => {
    if (titleIssue === '') {
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
  }, [titleIssue, isOpen]);

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleIssue(e.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<any>) => {
    setIssuePriority(event.target.value);
  };

  const handleConfirm = () => {};

  const modalBody = (
    <div className="issue-modal">
      <div className="text-input-issue-modal">
        <div className="input-modal">
          <TextField
            label="Title"
            name="title-issue"
            autoComplete="off"
            fullWidth
            value={titleIssue}
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

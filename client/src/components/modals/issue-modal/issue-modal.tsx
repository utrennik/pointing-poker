import { ChangeEvent, useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { IIssueModalErrors, IssuePriority } from '@models/types';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import { issueData } from './issueData';
import './issue-modal.sass';

const IssueModal = ({ isOpen, onClose }) => {
  const [titleIssue, setTitleIssue] = useState('');
  const [priopityIssue, setPriopityIssue] = useState(IssuePriority.HIGH);
  const [errors, setErrors] = useState({} as IIssueModalErrors);

  const clearForm = () => {
    setTitleIssue('');
    setPriopityIssue(IssuePriority.HIGH);
    setErrors({} as IIssueModalErrors);
  };

  const validate = () => {
    if (titleIssue === '') {
      setErrors({ ...errors, titleIssueError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.titleIssueError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (!isOpen) clearForm();
  }, [isOpen]);

  useEffect(() => {
    validate();
  }, [titleIssue, isOpen]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleIssue(e.target.value);
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setPriopityIssue(event.target.value);
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
            onChange={handleInput}
            error={errors.titleIssueError === true}
            required
          />
        </div>
      </div>

      <div className="select-issue-modal">
        <div className="select-modal">
          <InputLabel className="select-label" htmlFor="priority-issue">
            Set priority
          </InputLabel>
          <Select id="priority-issue" value={priopityIssue} onChange={handleChange}>
            {issueData.map(({ title, value }) => (
              <MenuItem key={title} value={value}>
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

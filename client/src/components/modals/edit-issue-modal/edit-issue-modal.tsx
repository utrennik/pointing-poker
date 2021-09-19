import { ChangeEvent, useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { IEditIssueModalErrors, IssuePriority } from '@models/types';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper.tsx';
import { issueData } from './edit-issueData';
import './edit-issue-modal.sass';

const EditIssueModal = ({ isOpen, onClose }: any) => {
  const [inputSettings, setInputSettings] = useState({
    titleIssue: '',
    linkIssue: '',
  });
  const [priopityIssue, setPriopityIssue] = useState(IssuePriority.HIGH);
  const [errors, setErrors] = useState({} as IEditIssueModalErrors);

  const clearForm = () => {
    setInputSettings({ titleIssue: '', linkIssue: '' });
    setPriopityIssue(IssuePriority.HIGH);
    setErrors({} as IEditIssueModalErrors);
  };

  const validate = () => {
    if (!inputSettings.titleIssue) {
      setErrors({ ...errors, titleIssueError: true });
    } else if (!inputSettings.linkIssue) {
      setErrors({ ...errors, linkIssueError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.titleIssueError;
      delete newErrors.linkIssueError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (!isOpen) clearForm();
  }, [isOpen]);

  useEffect(() => {
    validate();
  }, [inputSettings.titleIssue, inputSettings.linkIssue, isOpen]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSettings({ ...inputSettings, [event.target.name]: event.target.value });
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
            name="titleIssue"
            autoComplete="off"
            fullWidth
            value={inputSettings.titleIssue}
            onChange={handleInput}
            error={errors.titleIssueError === true}
            required
          />
        </div>
        <div className="input-modal">
          <TextField
            label="Link"
            name="linkIssue"
            autoComplete="off"
            fullWidth
            value={inputSettings.linkIssue}
            onChange={handleInput}
            error={errors.linkIssueError === true}
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
      title="Edit Issue"
      disableConfirm={!!Object.keys(errors).length}
    >
      {modalBody}
    </ModalWrapper>
  );
};

export default EditIssueModal;

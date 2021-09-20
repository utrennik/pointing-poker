import { useState } from 'react';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import IssueModal from '@components/modals/issue-modal/issue-modal';
import './issueCard.sass';

export const IssueCardCreate = ({ titleName = 'Create new Issue' }) => {
  const [addIssueModalOpen, setAddIssueModalOpen] = useState(false);

  const handleAddIssueModalOpen = () => {
    setAddIssueModalOpen(true);
  };

  const handleAddIssueModalClose = () => {
    setAddIssueModalOpen(false);
  };

  return (
    <>
      <Card className="issue-card">
        <CardHeader className="issue-card-header" title={titleName} />
        <IconButton className="issue-card-add-btn" onClick={handleAddIssueModalOpen} />
      </Card>
      <IssueModal isOpen={addIssueModalOpen} onClose={handleAddIssueModalClose} />
    </>
  );
};

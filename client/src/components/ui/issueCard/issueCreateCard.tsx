import { Card, CardHeader, IconButton } from '@material-ui/core';
import React from 'react';
import './issueCard.sass';

export const IssueCardCreate = ({ titleName = 'Create new Issue' }) => {
  const handleAddIssue = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card className="issue-card">
      <CardHeader className="issue-card-header" title={titleName} />
      <IconButton className="issue-card-add-btn" onClick={handleAddIssue} />
    </Card>
  );
};

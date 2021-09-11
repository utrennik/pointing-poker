import { Card, CardHeader, IconButton } from '@material-ui/core';
import React from 'react';
import './issueCard.sass';

export const IssueCardCreate = () => {
  const name = 'Create New Issue';

  const handleAddIssue = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card className="issue-card">
      <CardHeader className="issue-card-header" title={name} />

      <IconButton className="issue-card-add-btn" onClick={handleAddIssue} />
    </Card>
  );
};

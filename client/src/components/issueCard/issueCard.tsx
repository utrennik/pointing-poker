import { Card, CardHeader, IconButton } from '@material-ui/core';
import { IIssueCard } from '@models/types';
import React from 'react';
import './issueCard.sass';

export const IssueCard = ({ name, priority, isSelected }: IIssueCard) => {
  const isGame = false;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Card className="issue-card" style={isSelected ? { backgroundColor: '#60DABF75' } : {}}>
      <CardHeader className="issue-card-header" title={name} subheader={priority} />
      {isGame ? (
        <IconButton className="issue-card-close-btn" onClick={handleClose} />
      ) : (
        <IconButton className="issue-card-edit-btn" onClick={handleEdit} />
      )}
      {!isGame && <IconButton className="issue-card-delete-btn" onClick={handleDelete} />}
    </Card>
  );
};

import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import { RootState } from 'src/redux/store';
import { IIssueCard, IIssueID } from '@models/types';
import { WebSocketContext } from '@models/web-socket';
import { truncateString } from '@utils/stringUtils';
import EditIssueModal from '@components/modals/edit-issue-modal/edit-issue-modal';
import config from '@src/config.json';
import './issueCard.sass';

export const IssueCard = ({
  id,
  name,
  description,
  priority,
  isActive,
  isGame,
  isDealer,
  isPlayed,
}: IIssueCard) => {
  const [editIssueModalOpen, setEditIssueModalOpen] = useState(false);
  const roomID: string = useSelector((state: RootState) => state.game.room);
  const isVoting: boolean = useSelector((state: RootState) => state.game.isRoundRunning);
  const ws = useContext(WebSocketContext);

  const handleEditIssueModalOpen = () => {
    setEditIssueModalOpen(true);
  };

  const handleEditIssueModalClose = () => {
    setEditIssueModalOpen(false);
  };

  const handleDelete = () => {
    const issueDeleteData: IIssueID = {
      id,
      room: roomID,
    };
    ws.requestDeleteIssue(issueDeleteData);
  };

  const handleIssueSelect = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target && e.target.type === 'button') || !isGame) return;
    ws.requestSelectIssue(id);
  };

  const cardClass =
    (isActive && isPlayed && isGame && 'issue-card selected played') ||
    (isActive && isPlayed && isGame && 'issue-card selected played') ||
    (isActive && isGame && 'issue-card selected') ||
    (isPlayed && isGame && 'issue-card played') ||
    'issue-card';

  const maxSymbols = isGame
    ? config.truncateSettings.issueTitleMaxSymbolsGame
    : config.truncateSettings.issueTitleMaxSymbols;

  return (
    <div className={isGame ? 'clickable' : ''} title={name}>
      <Card className={cardClass} onClick={handleIssueSelect}>
        <CardHeader
          className="issue-card-header"
          title={truncateString(name, maxSymbols)}
          subheader={truncateString(priority)}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
        />
        {isGame && isDealer ? (
          <IconButton
            className="issue-card-close-btn"
            onClick={handleDelete}
            disabled={isActive && isVoting}
          />
        ) : (
          isDealer && [
            <IconButton className="issue-card-edit-btn" onClick={handleEditIssueModalOpen} />,
            <IconButton className="issue-card-delete-btn" onClick={handleDelete} />,
          ]
        )}
        <EditIssueModal
          isOpen={editIssueModalOpen}
          onClose={handleEditIssueModalClose}
          issueID={id}
          name={name}
          description={description}
          priority={priority}
        />
      </Card>
    </div>
  );
};

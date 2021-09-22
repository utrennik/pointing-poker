import { getGame } from "./gameRepository.js";
import EVENTS from "./events.js";

export const addIssue = ({
  id,
  name,
  room,
  priority,
  isActive = "false",
  score = "",
}) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const existingIssue = currentGame.issues.find((issue) => issue.id === id);
  if (existingIssue)
    return { issueError: new Error(`Issue with current name ${name} exist`) };
  const issue = { id, name, room, priority, isActive, score };
  currentGame.issues.push(issue);
  return { issue };
};

export const getIssue = (room, id) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const issue = currentGame.issues.find((issue) => issue.id === id);
  return { issue };
};

export const deleteIssue = (room, id) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const index = currentGame.issues.findIndex((issue) => issue.id === id);
  if (index !== -1) {
    const issue = currentGame.issues.splice(index, 1)[0];
    return { issue };
  }
};

export const updateIssue = (room, data) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const index = currentGame.issues.findIndex((issue) => issue.id === data.id);
  if (index < 0) return { issueError: new Error(`Issue not found`) };

  const existIssue = currentGame.issues.splice(index, 1)[0];
  const newIssue = { ...existIssue, ...data };
  currentGame.issues.push(newIssue);
  return { newIssue };
};

export const getIssues = (room) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const issues = currentGame.issues.filter((issue) => issue.room === room);
  return { issues };
};

export default ({ socket, io }) => {
  socket.on(
    EVENTS.REQ_ISSUE_ADD,
    ({ id, name, room, isActive, priority, score }) => {
      const { issue, gameError, issueError } = addIssue({
        id,
        room,
        name,
        isActive,
        priority,
        score,
      });
      if (gameError) return gameError;
      if (issueError) return issueError;
      const { issues } = getIssues(room);
      io.in(room).emit(EVENTS.RES_ISSUES_GET, issues);
    }
  );

  socket.on(EVENTS.REQ_ISSUE_DELETE, ({ id, room }) => {
    const { issue, gameError } = deleteIssue(room, id);
    if (gameError) return gameError;
    const { issues } = getIssues(room);
    io.in(room).emit(EVENTS.RES_ISSUES_GET, issues);
  });

  socket.on(EVENTS.REQ_ISSUE_UPDATE, (data) => {
    const { newIssue, gameError, issueError } = updateIssue(data.room, data);
    if (gameError) return gameError;
    if (issueError) return issueError;
    const { issues } = getIssues(data.room);
    io.in(data.room).emit(EVENTS.RES_ISSUES_GET, issues);
  });

  socket.on(EVENTS.REQ_ISSUES_GET, ({ room }) => {
    const { issues, gameError } = getIssues(room);
    if (gameError) return gameError;
    io.in(room).emit(EVENTS.RES_ISSUES_GET, issues);
  });
};

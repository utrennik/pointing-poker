import { getGame } from "./gameRepository.js";
import EVENTS from "./events.js";
import { getPokerGame } from "./pokerRepository.js";

export const addIssue = ({
  id,
  name,
  room,
  priority,
  isActive = false,
  description,
  stats,
}) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const existingIssue = currentGame.issues.find((issue) => issue.id === id);
  if (existingIssue)
    return { issueError: new Error(`Issue with current name ${name} exist`) };
  const issue = { id, name, room, priority, isActive, description, stats };
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

//  UPDATE ISSUE WITH CHECKING GFLAG ISACTIVE : IF CURRETN ISSUE IS ACTIVE - CLEAR FLAG FROM OTHER ISSUES
// when rounds start - can`t update IsActive on Issue

export const updateIssue = (room, data) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const index = currentGame.issues.findIndex((issue) => issue.id === data.id);
  if (index < 0) return { issueError: new Error(`Issue not found`) };
  const existIssue = currentGame.issues[index];
  // const {currentPokerGame} = getPokerGame(room);
  // console.log(currentPokerGame.round.isActive);
  // if(currentPokerGame && currentPokerGame.round.isActive) {
  //   const isActive = {isActive:false};
  //   currentGame.issues[index] = { ...existIssue,...data,isActive };
  //   const issue = currentGame.issues[index];
  //   return { issue };
  //  }

  if(data.isActive) {
    currentGame.issues.forEach(item => item.isActive = false)

  }
  currentGame.issues[index] = { ...existIssue, ...data };
  const issue = currentGame.issues[index];
  return { issue };
};

//   GET ISSUE WITH LOGIC ADDING IS ACTIVE TO 1st ELEMENT AND PUT SELECTED ISSUE TO ROUND
export const getIssues = (room) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const issues = currentGame.issues.filter((issue) => issue.room === room);
  const index = issues.findIndex((issue) => (issue.isActive === true));
  if (index < 0) {
    issues[0].isActive = true;
    const { currentPokerGame} = getPokerGame(room);
    console.log(currentPokerGame)
    if (currentPokerGame) {
      currentPokerGame.round.issueID = issues[0].id;
    }
    return { issues };
  }
  // const { currentPokerGame } = getPokerGame(room);
  // if (currentPokerGame ) {
    // currentPokerGame.round.issueID = issues[index].id;
  // }
  return { issues };
};

export default ({ socket, io }) => {
  socket.on(
    EVENTS.REQ_ISSUE_ADD,
    ({ id, name, room, isActive, priority, description, stats }) => {
      const { issue, gameError, issueError } = addIssue({
        id,
        room,
        name,
        isActive,
        priority,
        description,
        stats,
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
    const { gameError, issueError } = updateIssue(data.room, data);
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

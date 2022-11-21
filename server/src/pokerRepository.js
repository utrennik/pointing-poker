import EVENTS from "./events.js";
import { getGame } from "./gameRepository.js";
import {
  checkCurrentIssue,
  getIssue,
  getIssues,
  updateIssue,
} from "./issuesRepository.js";
import { addUser } from "./usersRepository.js";

const pokers = [];

export const addPokerGame = (room) => {
  const round = {};
  const roomID = room;
  const pokerGame = { roomID, round };
  pokers.push(pokerGame);
  return { pokerGame };
};

export const getPokerGame = (room) => {
  const currentPokerGame = pokers.find((poker) => poker.roomID === room);
  if (!currentPokerGame) return new Error("Poker game not found");
  return { currentPokerGame };
};

export const addRound = (room, id) => {
  const { currentPokerGame, pokerGameError } = getPokerGame(room);
  if (pokerGameError) return pokerGameError;
  const results = [];
  const score = "";
  const round = { issueID: id, results, isRoundStart: false, score };
  currentPokerGame.round = round;
  const currentRound = currentPokerGame.round;
  return { currentRound };
};

export const selectIssuePoker = ({ id, room }) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return;
  currentGame.poker.issue = id;
};

export default ({ socket, io }) => {
  socket.on(EVENTS.REQ_START_POKER, (data) => {
    const { currentGame, gameError } = getGame(data.room);
    if (gameError) return;
    currentGame.gameStatus = "poker";
    currentGame.settings = data;
    addPokerGame(data.room);
    const selectID = checkCurrentIssue(data.room);
    console.log(`dealer start poker game it the room: ${data.room}`);
    io.in(data.room).emit(EVENTS.RES_SELECT_ISSUE, selectID);
    io.in(data.room).emit(EVENTS.RES_START_POKER, data);
  });

  socket.on(EVENTS.REQ_SELECT_ISSUE, ({ roomID, issueID }) => {
    addRound(roomID, issueID);
    io.in(roomID).emit(EVENTS.RES_SELECT_ISSUE, issueID);
  });

  socket.on(EVENTS.REQ_START_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = true;
    getIssues(roomID);
    console.log(`start poker round in the room ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_START_ROUND, true);
  });

  socket.on(EVENTS.REQ_FINISH_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = false;
    const results = currentPokerGame.round.results;
    const res = {
      issueID: currentPokerGame.round.issueID,
      score: currentPokerGame.round.results,
    };
    console.log(`finish round in the room: ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_FINISH_ROUND, res);
  });

  socket.on(EVENTS.REQ_SET_SCORE, ({ issueID, roomID, score }) => {
    const { currentPokerGame } = getPokerGame(roomID);
    const scoreToRound = { issueID, roomID, score };
    currentPokerGame.round.score = score;
    currentPokerGame.round.isRoundStart = false;
    const { issue } = getIssue(roomID, issueID);
    const updatedIssue = { ...issue, score };
    const { updIssue } = updateIssue(roomID, updatedIssue);
    console.log(`dealer set score for ${issueID} issue in the room: ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_SET_SCORE, scoreToRound);
  });

  // mechanic of admit/reject

  socket.on(EVENTS.REQ_USER_GAME_JOIN, (dataUser) => {
    socket.join(dataUser.room);
    io.in(dataUser.room).emit(EVENTS.RES_USER_ADMIT, dataUser);
  });

  socket.on(EVENTS.REQ_USER_ADMIT, ({ roomID, user, isAdmitted }) => {
    // const { currentGame } = getGame(roomID);
    if (isAdmitted) {
      addUser(user);
      console.log(`Dealer admit to jon game ${user.id} user in ${roomID} room`)
      io.in(roomID).emit(EVENTS.RES_USER_ADMITTED, user);
    }
    if (!isAdmitted) {
      console.log(`Dealer cancel to jon game ${user.id} user in ${roomID} room`)
      io.in(roomID).emit(EVENTS.RES_USER_REJECTED, user);
    }
  });

  // vote mechanism
  socket.on(EVENTS.REQ_ROUND_VOTE, ({ roomID, issueID, userScore }) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    if (issueID === currentPokerGame.round.issueID) {
      const index = currentPokerGame.round.results.findIndex(
        (voit) => voit.userID === userScore.userID
      );
      if (index < 0) {
        currentPokerGame.round.results.push(userScore);
      } else {
        currentPokerGame.round.results[index] = userScore;
      }
      const res = {
        issueID,
        score: currentPokerGame.round.results,
      };
      console.log(
        `${userScore.userID} user make choice in poker game in the room ${roomID}`
      );
      io.in(roomID).emit(EVENTS.RES_ROUND_VOTE, res);
    }
  });

  socket.on(EVENTS.REQ_CARDS_FLIP, ({ roomID, isFlipped }) => {
    console.log(`flip cards in the room: ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_CARDS_FLIP, isFlipped);
  });

  socket.on(EVENTS.REQ_FINISH_GAME, (roomID) => {
    const { issues } = getIssues(roomID);
    console.log(`finish poker game in the room: ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_FINISH_GAME, issues);
  });

  socket.on(EVENTS.REQ_CLEAR_VOTING, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    const issueID = currentPokerGame.round.issueID;
    currentPokerGame.round.results = [];
    const res = {
      issueID,
      score: [],
    };
    console.log(`clear voting in   the room: ${roomID}`);
    io.in(roomID).emit(EVENTS.RES_ROUND_VOTE, res);
  });
};

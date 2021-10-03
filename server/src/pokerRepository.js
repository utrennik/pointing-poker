import EVENTS from "./events.js";
import { getGame } from "./gameRepository.js";
import { getIssue, getIssues,updateIssue } from "./issuesRepository.js";
import { addUser } from "./usersRepository.js";

const pokers = [];

// poker = {
//   roomID:string,
//   round: {
//     isRoundStart: boolean,
//     issueID : id,
//    isRoundStart: boolean,
//     results:[],

//     }
// }

//   LIAKE A  CRUD

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

const deletePokerGame = (room) => {
  const index = pokers.findIndex((poker) => poker.room === room);
  if (index < 0) return { pokerGameError: new Error("Poker game not found") };
  return pokers.splice(index, 1)[0];
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

// const getRound = (room, id) => {
//   const { currentPokerGame, pokerGameError } = getPokerGame(room);
//   if (pokerGameError) return pokerGameError;
//   return { currentRound };
// };

export const selectIssuePoker = ({ id, room }) => {
  const { currentGame, gameError } = getGame(room);
  if (gameError) return;
  currentGame.poker.issue = id;
};

export default ({ socket, io }) => {

  socket.on(EVENTS.REQ_TEST, ({ room}) => {
  const {currentPokerGame} = getPokerGame(room)
    if(currentPokerGame) {
      console.log(currentPokerGame)
    }
  });

  socket.on(EVENTS.REQ_START_POKER, (data) => {
    const { currentGame, gameError } = getGame(data.room);
    if (gameError) return;
    currentGame.settings = data;
    addPokerGame(data.room);
    io.in(data.room).emit(EVENTS.RES_START_POKER, data);
  });

  socket.on(EVENTS.REQ_SELECT_ISSUE, ({ roomID, issueID }) => {
    addRound(roomID, issueID);
    // const {issue} = getIssue(roomID,issueID);
    // const isActive = true
    // const newIssue = {...issue,isActive};
    // updateIssue(roomID,newIssue);
    io.in(roomID).emit(EVENTS.RES_SELECT_ISSUE, issueID);
  });
  //  when round start > with getIssues we define isActive issue to
  socket.on(EVENTS.REQ_START_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = true;
    getIssues(roomID);
    io.in(roomID).emit(EVENTS.RES_START_ROUND, true);
  });

  //  test variant

  socket.on(EVENTS.REQ_FINISH_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = false;
    const results = currentPokerGame.round.results;
    const res = {
      issueID:currentPokerGame.round.issueID,
      score: currentPokerGame.round.results
    }
    io.in(roomID).emit(EVENTS.RES_FINISH_ROUND, res);
  });

  socket.on(EVENTS.REQ_SET_SCORE, ({ issueID, roomID, score }) => {
    const { currentPokerGame } = getPokerGame(roomID);
    const scoreToRound = { issueID, roomID, score };
    currentPokerGame.round.score = score;
    currentPokerGame.round.isRoundStart = false;
    const {issue} = getIssue(roomID,issueID);
    const updatedIssue = {...issue,score};
    console.log(issue)
    const {updIssue} = updateIssue(roomID,updatedIssue);
    // const {issues} = getIssues(roomID);
    // io.in(roomID).emit(EVENTS.RES_ISSUES_GET,issues);
    io.in(roomID).emit(EVENTS.RES_SET_SCORE, scoreToRound);
  });

  // mechanic of admit/reject

  socket.on(EVENTS.REQ_USER_GAME_JOIN, (dataUser) => {
    socket.join(dataUser.room);
    io.in(dataUser.room).emit(EVENTS.RES_USER_ADMIT, dataUser);
  });

  socket.on(EVENTS.REQ_USER_ADMIT, ({ roomID, user, isAdmitted }) => {
    addUser(user);
    const { currentGame } = getGame(roomID);
    if (isAdmitted) {
      io.in(roomID).emit(EVENTS.RES_USER_JOINED, { user, currentGame });
    }
    if (!isAdmitted) {
      io.in(roomID).emit(EVENTS.RES_USER_REJECTED, isAdmitted);
    }
  });

  // vote mechanism
  socket.on(EVENTS.REQ_ROUND_VOTE, ({ roomID, issueID, userScore }) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    if (issueID == currentPokerGame.round.issueID) {
      const index = currentPokerGame.round.results.findIndex(
        (voit) => voit.userID === userScore.userID
      );
      if (index < 0) {
        currentPokerGame.round.results.push(userScore);
      }
      currentPokerGame.round.results[index] = userScore;
      const res = {
        issueID,
        score: currentPokerGame.round.results
      }
      io.in(roomID).emit(EVENTS.RES_ROUND_VOTE, res);
    }
  });

  socket.on(EVENTS.REQ_CARDS_FLIP,({roomID,isFlipped}) => {
    io.in(roomID).emit(EVENTS.RES_CARDS_FLIP,isFlipped)
  })



};

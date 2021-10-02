import { stringify } from "uuid";
import EVENTS from "./events.js";
import { getGame } from "./gameRepository.js";
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

export const addPokerGame = (room) => {
  const round = {};
  const roomID = room;
  const pokerGame = { roomID, round };
  pokers.push(pokerGame);
  return { pokerGame };
};

const getPokerGame = (room) => {
  const currentPokerGame = pokers.find((poker) => poker.roomID === room);
  if (!currentPokerGame) return new Error("Poker game not found");
  return { currentPokerGame };
};

const deletePokerGame = (room) => {
  const index = pokers.findIndex((poker) => poker.room === room);
  if (index < 0) return { pokerGameError: new Error("Poker game not found") };
  return pokers.splice(index, 1)[0];
};

const addRound = (room, id) => {
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

// export const selectIssuePoker = ({ id, room }) => {
//   const { currentGame, gameError } = getGame(room);
//   if (gameError) return;
//   currentGame.poker.issue = id;
// };

export default ({ socket, io }) => {
  socket.on(EVENTS.REQ_TEST, ({ room,isFlipped }) => {
    const { pokerGame } = addPokerGame(room);
    socket.join(room)
    console.log(isFlipped);
  });

  socket.on(EVENTS.REQ_SELECT_ISSUE, ({ roomID, issueID }) => {
    addRound(roomID, issueID);
    io.in(roomID).emit(EVENTS.RES_SELECT_ISSUE, issueID);
  });

  socket.on(EVENTS.REQ_START_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = true;
    io.in(roomID).emit(EVENTS.RES_START_ROUND, true);
  });

  //  test variant

  socket.on(EVENTS.REQ_FINISH_ROUND, (roomID) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = false;
    currentPokerGame.round.results = [
      { roomID: roomID, issueID: currentPokerGame.round.id, userScore: "test" },
      {
        roomID: roomID,
        issueID: currentPokerGame.round.id,
        userScore: "test2",
      },
    ];
    const results = currentPokerGame.round.results;
    io.in(roomID).emit(EVENTS.RES_FINISH_ROUND, results);
  });

  socket.on(EVENTS.REQ_SET_SCORE, ({ issueID, roomID, score }) => {
    const { currentPokerGame } = getPokerGame(roomID);
    const scoreToRound = { issueID, roomID, score };
    currentPokerGame.round.score = score;
    currentPokerGame.round.isRoundStart = false;
    io.in(roomID).emit(EVENTS.RES_SET_SCORE, scoreToRound);
  });

  // mechanic of admit/reject

  socket.on(EVENTS.REQ_USER_GAME_JOIN, (dataUser) => {
    socket.join(dataUser.room);
    io.in(dataUser.room).emit(EVENTS.RES_USER_ADMIT, dataUser);
  });

  socket.on(EVENTS.REQ_USER_ADMIT, ({ roomID, user, isAdmitted }) => {
    console.log(user);
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
      io.in(roomID).emit(EVENTS.RES_ROUND_VOTE, currentPokerGame.round.results);
    }
  });

  socket.on(EVENTS.REQ_CARDS_FLIP,({roomID,isFlipped}) => {
    io.in(roomID).emit(EVENTS.RES_CARDS_FLIP,isFlipped)
  })



};

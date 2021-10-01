import EVENTS from "./events.js";

const pokers = [];

// poker = {
//   round: {
  //     isRoundStart: boolean,
  //     issue : id,
   //    isRoundStart: boolean,
//     }
// }

export const addPokerGame = (room) => {
  const round = {};
  const pokerGame = { room, round };
  pokers.push(pokerGame);
  return { pokerGame };
};

const getPokerGame = (room) => {
  const currentPokerGame = pokers.find((poker) => poker.room === room);
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
  const round = { id,results };
  currentPokerGame.round = round;
  return { round };
};

// const getRound = (room, id) => {
//   const { currentPokerGame, pokerGameError } = getPokerGame(room);
//   if (pokerGameError) return pokerGameError;
//   const currentRound = currentPokerGame.rounds.find((round) => round.id === id);
//   return { currentRound };
// };

// export const selectIssuePoker = ({ id, room }) => {
//   const { currentGame, gameError } = getGame(room);
//   if (gameError) return;
//   currentGame.poker.issue = id;
// };

export default ({ socket, io }) => {
  socket.on(EVENTS.REQ_SELECT_ISSUE, ({ roomID, issueID }) => {
    addRound(roomID,issueID);
    io.in(room).emit(EVENTS.RES_SELECT_ISSUE,issueID );
  });

  socket.on(EVENTS.REQ_START_ROUND, ( roomID ) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = true
    io.in(room).emit(EVENTS.RES_START_ROUND, true);
  });

  socket.on(EVENTS.REQ_FINISH_ROUND, ( roomID ) => {
    const { currentPokerGame, pokerGameError } = getPokerGame(roomID);
    if (pokerGameError) return pokerGameError;
    currentPokerGame.round.isRoundStart = false;
    currentPokerGame.round.results = [{roomID:roomID,issueID:currentPokerGame.round.id,userScore: 'test' },{roomID:roomID,issueID:currentPokerGame.round.id,userScore: 'test2' }]
    const results = currentPokerGame.round.results;
    io.in(roomID).emit(EVENTS.RES_FINISH_ROUND,results);
  });
};
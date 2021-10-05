import { v4 as uuidv4 } from "uuid";
import EVENTS from "./events.js";

const games = [];

export const addGame = () => {
  const room = uuidv4();
  const users = [];
  const issues = [];
  const settings = {};
  const title = "";
  const dealer = {};
  const gameStatus = "lobby";
  const voting = {
    isVote: false,
    candidat: "",
    results: [],
  };
  const messages = [];
  const game = {
    room,
    users,
    issues,
    settings,
    title,
    dealer,
    gameStatus,
    voting,
    messages,
  };
  games.push(game);
  return { room, game };
};

export const getGame = (room) => {
  if (!room) return { gameError: new Error("Enter room ID") };
  const currentGame = games.find((game) => game.room === room);
  if (currentGame === undefined)
    return { gameError: new Error("Game not found") };
  return { currentGame };
};

export const deleteGame = (room) => {
  const index = games.findIndex((game) => game.room === room);
  if (index === -1) {
    return new Error("Game not found");
  } else {
    return games.splice(index, 1)[0];
  }
};

export default ({ socket, io }) => {
  socket.on(
    EVENTS.REQ_START_GAME,
    ({ id, firstName, lastName, jobPosition, avatar, role }, callback) => {
      const { room, game } = addGame();
      const dealer = {
        id,
        firstName,
        lastName,
        jobPosition,
        avatar,
        role,
        room,
      };
      game.dealer = dealer;
      socket.join(room);
      console.log(`start new game in the ${room}`)
      callback(dealer);
    }
  );

  socket.on(EVENTS.REQ_ROOM_CHECK, ({ room }, callback) => {
    const { gameError } = getGame(room);
    if (gameError) return callback(false);
    callback(true);
  });

  socket.on(EVENTS.REQ_TITLE_CHANGE, ({ room, title }) => {
    const { gameError, currentGame } = getGame(room);
    if (gameError) return;
    currentGame.title = title;
    console.log(`In room ${room} change title: ${title}`)
    io.in(room).emit(EVENTS.RES_TITLE_CHANGED, currentGame.title);
  });

  socket.on("disconnect", () => {
    const user = games.filter((game) => game.users.id === socket.id);
    if (user) {
      io.in(user.room).emit(
        EVENTS.NOTIFICATIONS,
        `${user.firstName} left the room: ${room}`
      );
    }
  });



  socket.on(EVENTS.REQ_CANCEL_GAME, ({ room }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    io.emit(EVENTS.NOTIFICATIONS, { message: "Current game cancelled." });
    currentGame.gameStatus = "cancelGame";
    const gameStatus = currentGame.gameStatus;
    console.log(`In room: ${room} cancel game`)
    io.in(room).emit(EVENTS.RES_CANCEL_GAME, { gameStatus });
    deleteGame(room);
  });
};
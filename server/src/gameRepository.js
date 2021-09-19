import { v4 as uuidv4 } from "uuid";
import EVENTS from "./events.js";

const games = [];

export const addGame = () => {
  const room = uuidv4();
  const users = [];
  const issues = [];
  const settings = [];
  const title = "";
  const dealer = {};
  const gameStatus = "";
  const voting = {
    isVote:false,
    candidat: "",
    results:[]
  };
  const game = { room, users, issues, settings, title, dealer, gameStatus,voting };
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
  const index = games.findIndex((game) => game.id === room);
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
    io.in(room).emit(EVENTS.RES_TITLE_CHANGED, currentGame.title);
  });

  socket.on("disconnect", () => {
    const user = games.filter((game) => game.users.id === socket.id);
    if (user) {
      io.in(user.room).emit(
        EVENTS.NOTIFICATIONS,
        `${user.firstName} left the room`
      );
    }
  });

  // interface Lobby-settings {
  //   dealer_is_gamer: boolean,
  //   cards_values: "fibo" | "pow-of-two" | "random"
  //   participation_in_game_for_new_users: "always" | "admit/reject"
  //   cards_autoreverse: boolean,
  //   revote_before_round_end: Boolean;
  //   Timer:null | 5000;  ( or seconds from our TimePicker)
  //   score_for_issues: "form" | "file_with_tasks"

  // }

  socket.on(
    EVENTS.REQ_START_POKER,
    ({
      room,
      dealer_is_gamer,
      cards_values,
      participation_in_game_for_new_users,
      cards_autoreverse,
      revote_before_round_end,
      timer,
      score_for_issues,
      gameStatus = "lobby",
    }) => {
      const { currentGame, gameError } = getGame(room);
      if (gameError) return;

      currentGame.settings = {
        dealer_is_gamer,
        cards_values,
        participation_in_game_for_new_users,
        cards_autoreverse,
        revote_before_round_end,
        timer,
        score_for_issues,
        gameStatus,
      };
      io.in(room).emit(EVENTS.RES_START_POKER, currentGame);
    }
  );
};

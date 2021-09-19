import { v4 as uuidv4 } from "uuid";

export const games = [];

export const addGame = () => {
  const room = uuidv4();
  const users = [];
  const issues = [];
  const settings = [];
  const title = "";
  const dealer = {};
  const game = { room,users,issues,settings,title,dealer }
  games.push(game);
  return {room,game};
};

export const getGame = (room) => {
  if(!room) return {gameError: new Error("Enter room ID")};
  const currentGame = games.find((game) => game.room === room );
  if (currentGame === undefined) return {gameError: new Error("Game not found")};
  return {currentGame};
};

export const deleteGame = (room) => {
  const index = games.findIndex((game) => game.id === room);
  if (index === -1) {
    return new Error("Game not found");
  } else {
    return games.splice(index, 1)[0];
  }
};

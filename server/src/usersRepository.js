import { getGame } from "./gameRepository.js";

export const addUser = ({
  id,
  firstName,
  room,
  role,
  lastName = "",
  jobPosition = "",
  avatar = "",
}) => {
  if(!room) return {userError: new Error("User haven`t room ID")};
  if(!id) return {userError: new Error("User haven`t ID")};
  if (!firstName) return {userError: new Error ("Username are required")};
  if (!role) return {userError: new Error("Role is required")};
  const {currentGame,gameError} = getGame(room);
  if (gameError) return gameError;
  const existingUser = currentGame.users.find((user) => user.id === id);
  if (existingUser) return {userError: new Error("User with current ID exist")};
  const user = { id, firstName, room, role, lastName, jobPosition, avatar };
  currentGame.users.push(user);
  return {user,currentGame};
};

export const getUser = (room, id) => {
  if(!room) return {userError: new Error("User haven`t room ID")};
  if(!id) return {userError: new Error("User haven`t ID")};
  const {currentGame,gameError} = getGame(room);
  if(gameError) return gameError;
  const user = currentGame.users.find((user) => user.id == id);
  return {user};
};

export const deleteUser = (room, id) => {
  if(!room) return {userDeleteError: new Error("User haven`t room ID")};
  if(!id) return {userDeleteError: new Error("User haven`t ID")};
  const {currentGame,gameError} = getGame(room);
  if(gameError) return gameError;
  const index = currentGame.users.findIndex((user) => user.id === id);
  if (index !== -1)  {
    const deletedUser =  currentGame.users.splice(index, 1)[0];
    return {deletedUser};
  }
};

// export const getUsers = (room) => users.filter((user) => user.room === room);

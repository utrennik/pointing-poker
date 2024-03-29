import { getGame } from "./gameRepository.js";
import EVENTS from "./events.js";

export const addUser = ({
  id,
  firstName,
  room,
  role,
  lastName = "",
  jobPosition = "",
  avatar = "",
}) => {
  if (!room) return { userError: new Error("User haven`t room ID") };
  if (!id) return { userError: new Error("User haven`t ID") };
  if (!firstName) return { userError: new Error("Username are required") };
  if (!role) return { userError: new Error("Role is required") };
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const existingUser = currentGame.users.find((user) => user.id === id);
  if (existingUser)
    return { userError: new Error("User with current ID exist") };
  const user = { id, firstName, room, role, lastName, jobPosition, avatar };
  currentGame.users.push(user);
  return { user, currentGame };
};

export const getUser = (room, id) => {
  if (!room) return { userError: new Error("User haven`t room ID") };
  if (!id) return { userError: new Error("User haven`t ID") };
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const user = currentGame.users.find((user) => user.id == id);
  return user;
};

export const deleteUser = (room, id) => {
  if (!room) return { userDeleteError: new Error("User haven`t room ID") };
  if (!id) return { userDeleteError: new Error("User haven`t ID") };
  const { currentGame, gameError } = getGame(room);
  if (gameError) return gameError;
  const index = currentGame.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = currentGame.users.splice(index, 1)[0];
    return { deletedUser };
  }
};

export default ({ socket, io }) => {
  socket.on(
    EVENTS.REQ_USER_JOIN,
    (
      { firstName, id, room, role, lastName, jobPosition, avatar },
      callback
    ) => {
      const { currentGame } = getGame(room);
      socket.join(room);
      callback(currentGame);
      if (
        currentGame.gameStatus === "poker" &&
        currentGame.settings.isFreeConnectionToGameForNewUsers
      ) {
        return ;
      }
      const { user, userError } = addUser({
        firstName,
        id,
        room,
        role,
        lastName,
        jobPosition,
        avatar,
      });
      if (userError) return callback(userError);

      // io.in(room).emit(EVENTS.NOTIFICATIONS, {
      //   message: `${user.firstName} just entered the room`,
      // });
      console.log(`user ${id} join the room: ${room}`);
      io.in(room).emit(EVENTS.RES_USER_JOINED, user);
    }
  );

  socket.on(EVENTS.REQ_USER_DELETE, ({ dealerID, userID, room }, callback) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return callback(gameError);
    if (currentGame.dealer.id !== dealerID)
      return callback(new Error("Only scrum master can delete user"));
    const { deletedUser, userDeleteError } = deleteUser(room, userID);
    if (userDeleteError) return callback(userDeleteError);
    console.log(`${userID} user delete from the room: ${room}`);
    io.in(room).emit(EVENTS.RES_USER_DELETED, deletedUser.id);
    io.in(room).emit(EVENTS.NOTIFICATIONS, `${deletedUser} just left the room`);
    callback(deletedUser);
  });

  socket.on(EVENTS.REQ_START_VOTE, ({ room, removerUserID, deleteUserID }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    if (!currentGame.voting.isVote && currentGame.users.length > 2) {
      currentGame.voting.isVote = true;
      currentGame.voting.candidat = deleteUserID;
      currentGame.voting.results.push(true);
      const removerUser = getUser(room, removerUserID);
      const deleteUser = getUser(room, deleteUserID);
      const removerUserFullName = removerUser.lastName
        ? `${removerUser.firstName} ${removerUser.lastName}`
        : removerUser.firstName;
      const deleteUserFullName = deleteUser.lastName
        ? `${deleteUser.firstName} ${deleteUser.lastName}`
        : deleteUser.firstName;
      console.log(
        `${removerUserID} propose delete ${deleteUserID} from ${room} room`
      );
      socket.in(currentGame.room).emit(EVENTS.RES_START_VOTE, {
        removerUserID,
        removerUserFullName,
        deleteUserID,
        deleteUserFullName,
      });
    }
  });

  socket.on(EVENTS.REQ_RESULT_VOTE, ({ room, result }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    let isDeleted = false;
    currentGame.voting.results.push(result);
    io.in(room).emit(EVENTS.NOTIFICATIONS, currentGame);
    const confirmDeleting = currentGame.voting.results.filter(
      (item) => item === true
    );
    if (
      currentGame.voting.results.length === currentGame.users.length - 1 &&
      confirmDeleting.length > (currentGame.users.length - 1) / 2
    ) {
      const { deletedUser } = deleteUser(room, currentGame.voting.candidat);
      const deletedUserID = deletedUser.id;
      isDeleted = true;
      console.log(
        `${deletedUserID} user deleted by voting from  the room: ${room}`
      );
      io.in(room).emit(EVENTS.RES_RESULT_VOTE, { deletedUserID, isDeleted });
      io.in(room).emit(
        EVENTS.NOTIFICATIONS,
        `${deletedUser.firstName} was deleted by voting`
      );
      currentGame.voting.isVote = false;
      currentGame.voting.results = [];
    }
    if (currentGame.voting.results.length === currentGame.users.length - 1) {
      currentGame.voting.isVote = false;
      currentGame.voting.results = [];
      isDeleted = false;
      const deletedUserID = currentGame.voting.candidat;
      console.log(` ${deletedUserID} user stay in  the room: ${room}`);
      io.in(room).emit(EVENTS.RES_RESULT_VOTE, { deletedUserID, isDeleted });
      io.in(room).emit(EVENTS.NOTIFICATIONS, `user stay in the room `);
    }
  });
};

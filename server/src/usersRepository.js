import { getGame } from "./gameRepository.js";
import EVENTS from "./events.js";

// const voting = {
//   isVote: false,
//  candidat:{}
//   results: []
// };

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
  return { user };
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

// export const getUsers = (room) => users.filter((user) => user.room === room);

export default ({ socket, io }) => {
  socket.on(
    EVENTS.REQ_USER_JOIN,
    (
      { firstName, id, room, role, lastName, jobPosition, avatar },
      callback
    ) => {
      const { user, currentGame, userError } = addUser({
        firstName,
        id,
        room,
        role,
        lastName,
        jobPosition,
        avatar,
      });
      if (userError) return callback(userError);
      socket.join(room);
      io.in(room).emit(EVENTS.NOTIFICATIONS, {
        message: `${user.firstName} just entered the room`,
      });
      io.in(room).emit(EVENTS.RES_USER_JOINED, user);
      callback(currentGame);
    }
  );

  socket.on(EVENTS.REQ_USER_DELETE, ({ dealerID, userID, room }, callback) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return callback(gameError);
    if (currentGame.dealer.id !== dealerID)
      return callback(new Error("Only scrum master can delete user"));
    const { deletedUser, userDeleteError } = deleteUser(room, userID);
    if (userDeleteError) return callback(userDeleteError);
    io.in(room).emit(EVENTS.RES_USER_DELETED, deletedUser.id);
    io.in(room).emit(EVENTS.NOTIFICATIONS, `${deletedUser} just left the room`);
    callback(deletedUser);
  });

  socket.on(EVENTS.REQ_START_VOTE, ({ room, voteUserID, deletedUserID }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    if (!currentGame.voting.isVote && currentGame.users.length > 2) {
      currentGame.voting.isVote = true;
      currentGame.voting.candidat = deletedUserID;
      currentGame.voting.results.push("yes");
      const isVote = currentGame.voting.isVote;
      socket
        .in(currentGame.room)
        .emit(EVENTS.RES_START_VOTE, { voteUserID, deletedUserID, isVote });
    }
  });

  socket.on(EVENTS.REQ_RESULT_VOTE, ({ room, result }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    const resultsOfVoting = currentGame.voting.results;
    resultsOfVoting.push(result);
    const confirmDeleting = resultsOfVoting.filter((item) => item === "yes");
    if (confirmDeleting.length > resultsOfVoting.length / 2) {
      const { deletedUser } = deleteUser(room, currentGame.voting.candidat);
      io.in(room).emit(EVENTS.RES_RESULT_VOTE, deletedUser.id);
      io.in(room).emit(
        EVENTS.NOTIFICATIONS,
        `${deletedUser.firstName} was deleted by voting`
      );
      currentGame.voting.isVote = false;
    }
  });
};

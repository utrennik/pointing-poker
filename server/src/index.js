import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, deleteUser } from "./usersRepository.js";
import { addGame, getGame } from "./gameRepository.js";
import EVENTS from "./events.js";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log(`Socket connect ${socket.id}`);

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
      socket.in(room).emit(EVENTS.NOTIFICATIONS, {
        message: `${user.firstName} just entered the room`,
      });
      socket.in(room).emit(EVENTS.RES_USER_JOINED, user);
      callback(currentGame);
    }
  );

  socket.on(EVENTS.REQ_USER_DELETE, ({ dealerID, userID, room }, callback) => {
    const {currentGame,gameError} = getGame(room);
    if(gameError) return callback(gameError);
    if(currentGame.dealer.id !== dealerID) return callback(new Error("Only scrum master can delete user"));
    const { deletedUser, userDeleteError } = deleteUser(room, userID);
    if (userDeleteError) return callback(userDeleteError);
    io.in(room).emit(EVENTS.RES_USER_DELETED, deletedUser.id);
    io.in(room).emit(EVENTS.NOTIFICATIONS, `${deletedUser} just left the room`);
    callback(deletedUser);
  });

  socket.on(EVENTS.REQ_TITLE_CHANGE, ({ room, title }, callback) => {
    const { gameError, currentGame } = getGame(room);
    if (gameError) return callback(gameError);
    currentGame.title = title;
    io.in(room).emit(EVENTS.RES_TITLE_CHANGED, currentGame.title);
    callback(currentGame.title);
  });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // const user = deleteUser(socket.id);
  // if (user) {
  //   io.in(user.room).emit("notification", {
  //     title: "Someone just left",
  //     description: `${user.firstName} just left the room`,
  //   });
  //   io.in(user.room).emit("users", getUsers(user.room));
  // }
  // });

  // socket.on("message:add", (message) => {
  //   const user = getUser(socket.id);
  //   io.in(user.room).emit("messages", {
  //     user: user.firstName,
  //     avatar: user.img,
  //     text: message,
  //   });
  // });

  // socket.on("issue:add", ({ name, room, priority, isActive, score }) => {
  //   addIssue(name, room, priority, isActive, score);
  //   io.in(room).emit("issues", getIssues(room));
  // });

  // socket.on("issue:delete", ({ name, room }) => {
  //   deleteIssue(name, room);
  //   io.in(room).emit("issues", getIssues);
  // });
  // socket.on("issue:update", ({ data, room }) => {
  //   updateIssue(data, room);
  //   io.in(room).emit("issues", getIssues);
  // });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

httpServer.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});

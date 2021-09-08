import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, deleteUser, getUser, getUsers } from "./users.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 8000;

app.use(cors());

io.on("connection", (socket) => {
  console.log(`Socket connect ${socket.id}`);
  socket.on(
    "user:join",
    ({ firstName, role, room, lastName, jobPosition, img }) => {
      const { user, error } = addUser(
        socket.id,
        firstName,
        room = socket.id,
        role = scrumMaster,
        lastName,
        jobPosition,
        img
      );
      socket.join(user.room);
      socket.in(user.room).emit("notification", {
        title: "Someone's here",
        description: `${user.firstName} just entered the room`,
      });
      socket.in(user.room).emit("users", getUsers(user.room));
    }
  );

  socket.on("disconnect", () => {
    console.log("user disconnected")
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit("notification", {
        title: "Someone just left",
        description: `${user.firstName} just left the room`,
      });
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });

  socket.on("message:add", (message) => {
    const user = getUser(socket.id);
    io.in(user.room).emit("messages", {
      user: user.firstName,
      avatar: user.img,
      text: message,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

httpServer.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});

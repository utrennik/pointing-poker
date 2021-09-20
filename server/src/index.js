import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import gameHandler from "./gameRepository.js"
import userHandler from "./usersRepository.js"
import issuesHandler from "./issuesRepository.js"

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT"],
  },
});

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log(`Socket connect ${socket.id}`);

  gameHandler({socket,io});
  userHandler({socket,io});
  issuesHandler({socket,io});

  // socket.on("message:add", (message) => {
  //   const user = getUser(socket.id);
  //   io.in(user.room).emit("messages", {
  //     user: user.firstName,
  //     avatar: user.img,
  //     text: message,
  //   });
  // });

});

app.get("/", (req, res) => {
  res.send("Hello");
});

httpServer.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});

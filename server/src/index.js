import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import gameHandler from "./gameRepository.js";
import userHandler from "./usersRepository.js";
import issuesHandler from "./issuesRepository.js";
import messagesHandler from "./messagesRepository.js"
import pokerRepository from "./pokerRepository.js";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:"*",
    methods: ["GET", "POST", "PUT"],
  },
});

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  gameHandler({ socket, io });
  userHandler({ socket, io });
  issuesHandler({ socket, io });
  messagesHandler({socket,io});
  pokerRepository({socket,io});
});

app.get("/", (req, res) => {
  res.send("Hello from Brest");
});

httpServer.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});

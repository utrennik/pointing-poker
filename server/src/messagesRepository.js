import EVENTS from "./events.js";
import { getGame } from "./gameRepository.js";

export default ({ socket, io }) => {
  socket.on(EVENTS.REQ_MESSAGE_ADD, (data) => {
    const { currentGame, gameError } = getGame(data.room);
    if (gameError) return;
    const messages = currentGame.messages;
    messages.push(data);
    io.in(currentGame.room).emit(EVENTS.RES_MESSAGES_GET, messages);
  });

  socket.on(EVENTS.REQ_MESSAGES_GET, ({ room }) => {
    const { currentGame, gameError } = getGame(room);
    if (gameError) return;
    const messages = currentGame.messages;
    io.in(room).emit(EVENTS.RES_MESSAGES_GET, messages);
  });
};

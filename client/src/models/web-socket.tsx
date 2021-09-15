import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setSocketConnected, setSocketDisconnected } from '@src/redux/actions';
import { IUser } from './types';
import config from '../config.json';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const socket: Socket = io(config.SERVER_BASE_URL);
  const dispatch = useDispatch();

  socket.on('connect', () => {
    dispatch(setSocketConnected());
  });

  socket.on('disconnect', () => {
    dispatch(setSocketDisconnected());
  });

  socket.on('connect_error', () => {
    dispatch(setSocketDisconnected());
  });

  const requestNewGame = (userData: IUser) => {
    socket.emit(config.REQUEST_NEW_GAME, userData);
  };

  const connectToGame = (userData: IUser) => {
    socket.emit(config.REQUEST_USER_JOIN, userData);
  };

  // if (!socket) {
  //   socket = io.connect(SERVER_BASE_URL);

  //   socket.on('event://get-message', (msg) => {
  //     const payload = JSON.parse(msg);
  //     dispatch(updateChatLog(payload));
  //   });

  const ws: any = {
    socket,
    requestNewGame,
    connectToGame,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

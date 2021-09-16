import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import {
  setSocketConnected,
  setSocketDisconnected,
  setClientUser,
  setGame,
  addUser,
} from '@src/redux/actions';
import { IUser } from './types';
import config from '../config.json';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  const socket: Socket = io(config.SERVER_BASE_URL);
  const dispatch = useDispatch();
  const history = useHistory();

  socket.on('connect', () => {
    dispatch(setSocketConnected());
  });

  socket.on('disconnect', () => {
    dispatch(setSocketDisconnected());
  });

  socket.on('connect_error', () => {
    dispatch(setSocketDisconnected());
  });

  socket.on(config.RES_USER_JOINED, (user: IUser) => {
    dispatch(addUser(user));
  });

  const requestStartGame = (userData: IUser) => {
    socket.emit(config.REQ_START_GAME, userData, (res: IUser) => {
      dispatch(setClientUser(res));
      history.push('/lobby');
    });
  };

  const requestUserJoin = (userData: IUser) => {
    socket.emit(config.REQUEST_USER_JOIN, userData, (res: IGame) => {
      dispatch(setClientUser(userData));
      dispatch(setGame(res));
    });
  };

  const ws: any = {
    socket,
    requestStartGame,
    requestUserJoin,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

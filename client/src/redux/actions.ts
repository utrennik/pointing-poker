import { IUser, IGame } from '../models/types';

export const types = {
  SOCKET_CONNECTED: 'SOCKET_CONNECTED',
  SOCKET_DISCONNECTED: 'SOCKET_DISCONNECTED',
  SET_CLIENT_USER: 'SET_CLIENT_USER',
  SET_GAME: 'SET_GAME',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
};

export const setSocketConnected = () => ({
  type: types.SOCKET_CONNECTED,
});

export const setSocketDisconnected = () => ({
  type: types.SOCKET_DISCONNECTED,
});

export const setClientUser = (user: IUser) => ({
  type: types.SET_CLIENT_USER,
  payload: { user },
});

export const setGame = (game: IGame) => ({
  type: types.SET_GAME,
  payload: { game },
});

export const addUser = (user: IUser) => ({
  type: types.ADD_USER,
  payload: { user },
});

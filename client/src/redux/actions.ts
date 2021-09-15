import { IUser } from '../models/types';

export const types = {
  SOCKET_CONNECTED: 'SOCKET_CONNECTED',
  SOCKET_DISCONNECTED: 'SOCKET_DISCONNECTED',
  SET_GAME_ID: 'SET_GAME_ID',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
};

export const setSocketConnected = () => ({
  type: types.SOCKET_CONNECTED,
});

export const setSocketDisconnected = () => ({
  type: types.SOCKET_DISCONNECTED,
});

export const setGameID = (gameID: string) => ({
  type: types.SET_GAME_ID,
  payload: { gameID },
});

export const addUser = (user: IUser) => ({
  type: types.ADD_USER,
  payload: { user },
});

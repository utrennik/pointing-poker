import { IUser, IGame } from '../models/types';

export const types = {
  SOCKET_CONNECTED: 'SOCKET_CONNECTED',
  SOCKET_DISCONNECTED: 'SOCKET_DISCONNECTED',
  SET_CLIENT_USER: 'SET_CLIENT_USER',
  SET_GAME: 'SET_GAME',
  ADD_USER: 'ADD_USER',
  SET_IS_DEALER_LOBBY: 'SET_IS_DEALER_LOBBY',
  DELETE_USER: 'DELETE_USER',
  CHANGE_TITLE: 'CHANGE_TITLE',
  RESET_STATE: 'RESET_STATE',
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

export const deleteUser = (userID: string) => ({
  type: types.DELETE_USER,
  payload: { userID },
});

export const setIsDealerLobby = (isDealer: boolean) => ({
  type: types.SET_IS_DEALER_LOBBY,
  payload: { isDealer },
});

export const changeTitle = (title: string) => ({
  type: types.CHANGE_TITLE,
  payload: { title },
});

export const resetState = () => ({
  type: types.RESET_STATE,
});
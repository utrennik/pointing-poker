import { IUser, IGame, IUserDeleteVoteData, IIssue, GameStatus } from '../models/types';

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
  SET_DELETE_VOTING: 'SET_DELETE_VOTING',
  RESET_DELETE_VOTING: 'RESET_DELETE_VOTING',
  SET_DELETE_VOTING_MODAL_OPEN: 'SET_DELETE_VOTING_MODAL_OPEN',
  SET_ISSUES: 'SET_ISSUES',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
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

export const setDeleteVoting = (deleteVotingData: IUserDeleteVoteData) => ({
  type: types.SET_DELETE_VOTING,
  payload: { deleteVotingData },
});

export const setDeleteVotingModalOpen = (deleteVotingModalOpen: boolean) => ({
  type: types.SET_DELETE_VOTING_MODAL_OPEN,
  payload: deleteVotingModalOpen,
});

export const resetDeleteVoting = () => ({
  type: types.RESET_DELETE_VOTING,
});

export const setIssues = (issues: IIssue[]) => ({
  type: types.SET_ISSUES,
  payload: { issues },
});

export const setGameStatus = (status: GameStatus) => ({
  type: types.SET_GAME_STATUS,
  payload: { status },
});

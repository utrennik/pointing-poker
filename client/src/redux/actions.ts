import {
  IUser,
  IGame,
  IUserDeleteVoteData,
  ILobbySettings,
  IIssue,
  GameStatus,
  IMessage,
  IRoundVoteResults,
  IIssueScoreData,
} from '../models/types';

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
  SET_MESSAGES: 'SET_MESSAGES',
  RESET_UNREAD_MESSAGES: 'SET_UNREAD_MESSAGES',
  SET_CHAT_ISOPEN: 'SET_CHAT_ISOPEN',
  SET_ISSUES: 'SET_ISSUES',
  SET_CURRENT_ISSUE: 'SET_CURRENT_ISSUE',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  SET_POKER_GAME_SETTINGS: 'SET_POKER_GAME_SETTINGS',
  SET_IS_ROUND_RUNNING: 'SET_IS_ROUND_RUNNING',
  SET_ROUND_VOTE_RESULTS: 'SET_ROUND_VOTE_RESULTS',
  SET_IS_FLIPPED: 'SET_IS_FLIPPED',
  SET_ISSUE_SCORE: 'SET_ISSUE_SCORE',
  SET_ADMIT_OPEN: 'SET_ADMIT_OPEN',
  SET_ADMIT_USER: 'SET_ADMIT_USER',
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

export const setMessages = (messages: IMessage[]) => ({
  type: types.SET_MESSAGES,
  payload: { messages },
});

export const resetUnreadMessages = () => ({
  type: types.RESET_UNREAD_MESSAGES,
});

export const setChatIsOpen = (isOpen: boolean) => ({
  type: types.SET_CHAT_ISOPEN,
  payload: { isOpen },
});

export const setIssues = (issues: IIssue[]) => ({
  type: types.SET_ISSUES,
  payload: { issues },
});

export const setCurrentIssue = (issueID: string) => ({
  type: types.SET_CURRENT_ISSUE,
  payload: { issueID },
});

export const setGameStatus = (gameStatus: GameStatus) => ({
  type: types.SET_GAME_STATUS,
  payload: { gameStatus },
});

export const setPokerGameSettings = (pokerGameSettingsData: ILobbySettings) => ({
  type: types.SET_POKER_GAME_SETTINGS,
  payload: pokerGameSettingsData,
});

export const setIsRoundRunning = (isRoundRunning: boolean) => ({
  type: types.SET_IS_ROUND_RUNNING,
  payload: { isRoundRunning },
});

export const setRoundVoteResults = (roundVoteResults: IRoundVoteResults) => ({
  type: types.SET_ROUND_VOTE_RESULTS,
  payload: { roundVoteResults },
});

export const setIsFlipped = (isFlipped: boolean) => ({
  type: types.SET_IS_FLIPPED,
  payload: { isFlipped },
});

export const setIssueScore = (scoreData: IIssueScoreData) => ({
  type: types.SET_ISSUE_SCORE,
  payload: { scoreData },
});

export const setAdmitOpen = (isOpen: boolean) => ({
  type: types.SET_ADMIT_OPEN,
  payload: isOpen,
});

export const setAdmitUser = (admitUser: IUser) => ({
  type: types.SET_ADMIT_USER,
  payload: { admitUser },
});

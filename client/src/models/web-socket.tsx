import { createContext, ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useHistory } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import {
  setSocketConnected,
  setSocketDisconnected,
  setClientUser,
  setGame,
  addUser,
  deleteUser,
  setIsDealerLobby,
  changeTitle,
  resetState,
  setDeleteVoting,
  resetDeleteVoting,
  setIssues,
  setMessages,
  setGameStatus,
  setPokerGameSettings,
  setCurrentIssue,
  setIsRoundRunning,
  setIsFlipped,
  setRoundVoteResults,
  setIssueScore,
} from '@src/redux/actions';

import {
  IUser,
  IUserDelete,
  IGame,
  IUserDeleteVote,
  IUserDeleteVoteData,
  IDeleteVoteFinishData,
  IDeleteVoteResults,
  IIssue,
  IMessage,
  GameStatus,
  ILobbySettings,
  IGameStatus,
  IIssueID,
  IRoundVoteResults,
  IRoundVoteData,
  IFlipCards,
  IIssueScoreData,
} from './types';
import config from '../config.json';

const WebSocketContext = createContext(null);
const SERVER_URL = config.SERVER_BASE_URL;

export { WebSocketContext };

export default ({ children }: { children: ReactChild[] }) => {
  let socket: Socket | undefined;

  if (!socket) socket = io(SERVER_URL);
  const dispatch = useDispatch();
  const history = useHistory();
  const clientUser: IUser = useSelector((state: RootState) => state.client.clientUser as IUser);
  const currentGame: IGame = useSelector((state: RootState) => state.game as IGame);
  const [notification, setNotification] = useState('');
  let client = {} as IUser; // TODO: used bacause the state is unavailable in socket.on callbacks

  // TODO: For testing game page, PLEASE REMOVE after test
  // const gamePageTest = () => {
  //   history.push('/game');
  // };

  // gamePageTest();

  const resetClient = () => {
    history.push('/');
    dispatch(resetState());
    dispatch(setGameStatus(GameStatus.CANCEL));
    socket = io(SERVER_URL);
    client = {} as IUser;
  };

  const handleDeleteUser = (userID: string) => {
    console.log(`User ${userID} deleted notification...`);
    if (userID === client.id) {
      resetClient();
    } else {
      dispatch(deleteUser(userID));
    }
  };

  const clientExit = () => {
    console.log(`User ${clientUser.id} exit requested...`);
    socket?.emit(
      config.REQ_USER_DELETE,
      {
        dealerID: currentGame.dealer.id,
        userID: clientUser.id,
        room: currentGame.room,
      },
      (deletedUser: IUser) => {
        if (deletedUser.id) {
          console.log(`User ${deletedUser.id} deleted...`);
          resetClient();
        }
      }
    );
  };

  const requestStartGame = (userData: IUser) => {
    socket?.emit(config.REQ_START_GAME, userData, (res: IUser) => {
      console.log(`Game ${JSON.stringify(res)} started...`);
      dispatch(setClientUser(res));
      client = res;
      dispatch(setGame({ dealer: res, room: res.room }));
      dispatch(setIsDealerLobby(true));
      dispatch(setGameStatus(GameStatus.LOBBY));
      history.push('/lobby');
    });
  };

  const requestTitleChange = (title: string) => {
    socket?.emit(config.REQ_TITLE_CHANGE, { title, room: clientUser.room });
    console.log(`Title ${title} change requested...`);
  };

  socket.on(config.RES_TITLE_CHANGED, (title: string) => {
    console.log(`Title ${title} changed...`);

    dispatch(changeTitle(title));
  });

  const checkIsRoomExists = (
    roomID: string,
    setConnectModalOpen: Function,
    setNoRoomError: Function
  ) => {
    socket?.emit(config.REQ_ROOM_CHECK, { room: roomID }, (res: boolean) => {
      console.log(`Room ${roomID} ${res ? 'exists' : 'not exists'}...`);
      setConnectModalOpen(res);
      setNoRoomError(!res);
    });
  };

  const requestUserJoin = (userData: IUser) => {
    socket?.emit(config.REQ_USER_JOIN, userData, (res: IGame) => {
      console.log(`User ${userData.firstName} ${userData.lastName} join requested...`);

      dispatch(setClientUser(userData));
      client = userData;
      console.log(`Game data received...`);
      dispatch(setGame(res));
      dispatch(setIsDealerLobby(false));
      dispatch(setGameStatus(GameStatus.LOBBY));
      history.push('/lobby');
    });
  };

  const requestUserDelete = (userID: string) => {
    if (clientUser.role === config.DEALER) {
      const userDeleteData: IUserDelete = {
        dealerID: clientUser.id,
        userID,
        room: currentGame.room,
      };
      socket?.emit(config.REQ_USER_DELETE, userDeleteData, (deletedUser: IUser) => {
        console.log(`User ${userID} delete requested...`);
        if (deletedUser.id) {
          console.log(`User ${deletedUser.id} deleted...`);
        }
      });
    } else {
      const userDeleteVoteData: IUserDeleteVote = {
        room: currentGame.room,
        removerUserID: clientUser.id,
        deleteUserID: userID,
      };
      socket?.emit(config.REQ_START_USER_DELETE_VOTE, userDeleteVoteData);
      console.log(
        `User ${userID} delete vote requested... Data: ${JSON.stringify(userDeleteVoteData)}`
      );
    }
  };

  const requestDeleteVoteFinish = (isDelete: boolean) => {
    const deleteVoteFinishData: IDeleteVoteFinishData = {
      room: currentGame.room,
      result: isDelete,
    };
    socket?.emit(config.REQ_FINISH_DELETE_VOTE, deleteVoteFinishData);
  };

  const requestAddMessage = (messageData: IMessage) => {
    socket?.emit(config.REQ_MESSAGE_ADD, messageData);
    console.log(`Requested add message: ${JSON.stringify(messageData)}`);
  };

  const requestAddIssue = (issueData: IIssue) => {
    socket?.emit(config.REQ_ISSUE_ADD, issueData);
    console.log(`Requested add issue: ${JSON.stringify(issueData)}`);
  };

  const requestUpdateIssue = (issueData: IIssue) => {
    console.log(`Requested update issue: ${JSON.stringify(issueData)}`);
    socket?.emit(config.REQ_ISSUE_UPDATE, issueData);
  };

  const requestDeleteIssue = (issueDeleteData: IIssueID) => {
    console.log(`Requested delete issue: ${JSON.stringify(issueDeleteData)}`);
    socket?.emit(config.REQ_ISSUE_DELETE, issueDeleteData);
  };
  const requestPokerGameStart = (settings: ILobbySettings) => {
    socket?.emit(config.REQ_START_POKER_GAME, settings);
  };

  const requestCancelGame = () => {
    const cancelGameData = {
      room: currentGame.room,
    };
    socket?.emit(config.REQ_CANCEL_GAME, cancelGameData);
    console.log('Game cancel requested');
  };

  const requestSelectIssue = (issueID: string) => {
    const selectIssueData: IIssueID = {
      issueID,
      roomID: currentGame.room,
    };
    console.log(`Requested select issue ${selectIssueData}}`);
    socket?.emit(config.REQ_SELECT_ISSUE, selectIssueData);
  };

  const requestStartRound = () => {
    const roomID = currentGame.room;
    console.log(`Requested start round ${roomID}`);
    socket?.emit(config.REQ_START_ROUND, roomID);
  };

  const requestFinishRound = () => {
    const roomID = currentGame.room;
    console.log(`Requested finish round ${roomID}`);
    socket?.emit(config.REQ_FINISH_ROUND, roomID);
  };

  const requestRoundVote = (cardValue: string) => {
    const roundVoteData: IRoundVoteData = {
      roomID: currentGame.room,
      issueID: currentGame.currentIssue.id,
      userScore: {
        userID: clientUser.id,
        score: cardValue,
      },
    };

    console.log(`Requested send vote ${JSON.stringify(roundVoteData)}`);
    socket?.emit(config.REQ_ROUND_VOTE, roundVoteData);
  };

  const requestFlipCards = (isFlipped: boolean) => {
    const flipData: IFlipCards = {
      roomID: currentGame.room,
      isFlipped,
    };
    console.log(`Requested flip cards ${JSON.stringify(flipData)}`);
    socket?.emit(config.REQ_FLIP_CARDS, flipData);
  };

  const requestSetScore = (score: string) => {
    const scoreData: IIssueScoreData = {
      roomID: currentGame.room,
      issueID: currentGame.currentIssue.id,
      score,
    };
    console.log(`Requested set score ${JSON.stringify(scoreData)}`);
    socket?.emit(config.REQ_SET_SCORE, scoreData);
  };

  socket.on('connect', () => {
    dispatch(setSocketConnected());
    console.log('Server connected...');
  });

  socket.on('disconnect', () => {
    console.log('Server disconnected...');
    dispatch(setSocketDisconnected());
  });

  socket.on('connect_error', () => {
    console.log('Connection error...');
    dispatch(setSocketDisconnected());
  });

  socket.on(config.RES_USER_JOINED, (user: IUser) => {
    dispatch(addUser(user));
    console.log(`User id${user.firstName} ${user.lastName} joined...`);
  });

  socket.on(config.RES_USER_DELETED, (deletedUserID: string) => {
    handleDeleteUser(deletedUserID);
  });

  socket.on(config.RES_START_USER_DELETE_VOTE, (deleteVotingData: IUserDeleteVoteData) => {
    if (client.role !== config.DEALER && client.id !== deleteVotingData.removerUserID) {
      dispatch(setDeleteVoting(deleteVotingData));
    }
    console.log(
      `Voting to delete user ${deleteVotingData.deleteUserFullName}
      by ${deleteVotingData.removerUserFullName} started...
      Data: ${JSON.stringify(deleteVotingData)}`
    );
  });

  socket.on(config.RES_USER_DELETE_VOTE, (voteResultsData: IDeleteVoteResults) => {
    if (voteResultsData.isDeleted) {
      if (voteResultsData.deletedUserID === client.id) setNotification(config.KICKED_NOTIFICATION);
      // TODO: need to add notification when the dealer kicks the user
      // TODO: (if add now to handleDelete, it will be shown on user exit)
      handleDeleteUser(voteResultsData.deletedUserID);
    }
    dispatch(resetDeleteVoting());
  });

  socket.on(config.RES_MESSAGES_GET, (messages: IMessage[]) => {
    console.log(`Messages received: ${messages}`);
    dispatch(setMessages(messages));
  });

  socket.on(config.RES_ISSUES_GET, (issues: IIssue[]) => {
    console.log(`Issues received: ${issues}`);
    dispatch(setIssues(issues));
  });

  socket.on(config.RES_START_POKER_GAME, (data: ILobbySettings) => {
    console.log(data);
  });

  socket.on(config.RES_START_POKER_GAME, (pokerGameSettingsData: ILobbySettings) => {
    dispatch(setPokerGameSettings(pokerGameSettingsData));
    history.push('/game');
  });

  socket.on(config.RES_CANCEL_GAME, (gameStatusData: IGameStatus) => {
    console.log(`Game canceled !`);

    if (gameStatusData.gameStatus === 'cancel') {
      resetClient();
    }
  });

  socket.on(config.RES_SELECT_ISSUE, (issueID: string) => {
    console.log(`Issue selected: ${issueID}`);
    dispatch(setCurrentIssue(issueID));
  });

  socket.on(config.RES_START_ROUND, (isStarted: boolean) => {
    console.log(`round started: ${isStarted}`);
    dispatch(setIsRoundRunning(isStarted));
    dispatch(setIsFlipped(false));
  });

  socket.on(config.RES_FINISH_ROUND, (roundVoteResults: IRoundVoteResults) => {
    console.log(`round finished: ${JSON.stringify(roundVoteResults)}`);
    dispatch(setIsRoundRunning(false));
  });

  socket.on(config.RES_ROUND_VOTE, (roundVoteResults: IRoundVoteResults) => {
    console.log(`vote accepted: ${JSON.stringify(roundVoteResults)}`);
    dispatch(setRoundVoteResults(roundVoteResults));
  });

  socket.on(config.RES_FLIP_CARDS, (isFlipped: boolean) => {
    console.log(`cards flipped: ${isFlipped}`);
    dispatch(setIsFlipped(isFlipped));
  });

  socket.on(config.RES_SET_SCORE, (scoreData: IIssueScoreData) => {
    const { score } = scoreData;
    console.log(`Current issue score setted: ${score}`);
    dispatch(setIssueScore(scoreData));
  });

  const ws: any = {
    socket,
    requestStartGame,
    requestUserJoin,
    requestUserDelete,
    checkIsRoomExists,
    requestTitleChange,
    clientExit,
    requestDeleteVoteFinish,
    notification,
    setNotification,
    requestAddMessage,
    requestAddIssue,
    requestUpdateIssue,
    requestDeleteIssue,
    requestCancelGame,
    requestPokerGameStart,
    requestSelectIssue,
    requestStartRound,
    requestFinishRound,
    requestRoundVote,
    requestFlipCards,
    requestSetScore,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

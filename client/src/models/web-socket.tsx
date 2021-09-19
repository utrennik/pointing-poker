import { createContext } from 'react';
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
} from '@src/redux/actions';
import { IUser, IUserDelete, IGame } from './types';
import config from '../config.json';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket: Socket | undefined;

  if (!socket) socket = io(config.SERVER_HOME_URL);
  const dispatch = useDispatch();
  const history = useHistory();
  const clientUser: IUser = useSelector((state: RootState) => state.client.clientUser as IUser);
  const currentGame: IGame = useSelector((state: RootState) => state.game as IGame);
  let client = {}; // TODO: used bacause the state is unavailable in socket.on callbacks

  socket.on('connect', () => {
    dispatch(setSocketConnected());
    console.log('Server connected...');
  });

  socket.on('disconnect', () => {
    dispatch(setSocketDisconnected());
  });

  socket.on('connect_error', () => {
    dispatch(setSocketDisconnected());
  });

  socket.on(config.RES_USER_JOINED, (user: IUser) => {
    dispatch(addUser(user));

    console.log(`User id${user.firstName} ${user.lastName} joined...`);
  });

  const requestStartGame = (userData: IUser) => {
    socket.emit(config.REQ_START_GAME, userData, (res: IUser) => {
      console.log(`Game ${res.room} started...`);
      dispatch(setClientUser(res));
      client = res;
      dispatch(setGame({ dealer: res, room: res.room }));
      dispatch(setIsDealerLobby(true));
      history.push('/lobby');
    });
  };

  const requestUserJoin = (userData: IUser) => {
    socket.emit(config.REQ_USER_JOIN, userData, (res: IGame) => {
      console.log(`User ${userData.firstName} ${userData.lastName} join requested...`);

      dispatch(setClientUser(userData));
      client = userData;
      console.log(`Game data received...`);
      dispatch(setGame(res));
      dispatch(setIsDealerLobby(false));
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
      socket.emit(config.REQ_USER_DELETE, userDeleteData, (deletedUser: IUser) => {
        console.log(`User ${userID} delete requested...`);
        if (deletedUser.id) {
          console.log(`User ${deletedUser.id} deleted...`);
        }
      });
    }
  };

  const resetClient = () => {
    history.push('/');
    dispatch(resetState());
    socket = io(config.SERVER_HOME_URL);
    client = {};
  };

  socket.on(config.RES_USER_DELETED, (userID: string) => {
    console.log(`User ${userID} deleted notification...`);
    console.log(`Client:${JSON.stringify(client)}`);
    if (userID === client.id) {
      resetClient();
    } else {
      dispatch(deleteUser(userID));
    }
  });

  const checkIsRoomExists = (
    roomID: string,
    setConnectModalOpen: Function,
    setNoRoomError: Function
  ) => {
    socket.emit(config.REQ_ROOM_CHECK, { room: roomID }, (res: boolean) => {
      console.log(`Room ${roomID} ${res ? 'exists' : 'not exists'}...`);
      setConnectModalOpen(res);
      setNoRoomError(!res);
    });
  };

  const requestTitleChange = (title: string) => {
    socket.emit(config.REQ_TITLE_CHANGE, { title, room: clientUser.room });
    console.log(`Title ${title} change requested...`);
  };

  socket.on(config.RES_TITLE_CHANGED, (title: string) => {
    console.log(`Title ${title} changed...`);

    dispatch(changeTitle(title));
  });

  const clientExit = () => {
    console.log(`User ${clientUser.id} exit requested...`);
    socket.emit(
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

  const ws: any = {
    socket,
    requestStartGame,
    requestUserJoin,
    requestUserDelete,
    checkIsRoomExists,
    requestTitleChange,
    clientExit,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

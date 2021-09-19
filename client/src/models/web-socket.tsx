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
      dispatch(setGame({ dealer: res, room: res.room }));
      dispatch(setIsDealerLobby(true));
      history.push('/lobby');
    });
  };

  const requestUserJoin = (userData: IUser) => {
    socket.emit(config.REQ_USER_JOIN, userData, (res: IGame) => {
      console.log(`User ${userData.firstName} ${userData.lastName} join requested...`);

      dispatch(setClientUser(userData));
      console.log(`Game data received: ${JSON.stringify(res)}`);
      dispatch(setGame(res));
      dispatch(setIsDealerLobby(false));
      history.push('/lobby');
    });
  };

  const requestUserDelete = (userID: string) => {
    if (clientUser.role === config.DEALER && clientUser.room) {
      const userDeleteData: IUserDelete = {
        dealerID: clientUser.id,
        userID,
        room: clientUser.room,
      };
      socket.emit(config.REQ_USER_DELETE, userDeleteData);
      console.log(`User ${userID} delete requested...`);
    }
  };

  socket.on(config.RES_USER_DELETED, (userID: string) => {
    console.log(`User ${userID} deleted...`);

    dispatch(deleteUser(userID));
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

  const ws: any = {
    socket,
    requestStartGame,
    requestUserJoin,
    requestUserDelete,
    checkIsRoomExists,
    requestTitleChange,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

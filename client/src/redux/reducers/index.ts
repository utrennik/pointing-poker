import { combineReducers } from 'redux';
import { clientReducer } from './client-reducer';
import { gameReducer } from './game-reducer';
import { socketReducer } from './socket-reducer';
import { deleteVotingReducer } from './delete-voting-reducer';
import { chatReducer } from './chat-reducer';
import { types } from '../actions';

const appReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  client: clientReducer,
  deleteVoting: deleteVotingReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.RESET_STATE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from 'redux';
import { clientReducer } from './client-reducer';
import { gameReducer } from './game-reducer';
import { socketReducer } from './socket-reducer';
import { deleteVotingReducer } from './delete-voting-reducer';
import { types } from '../actions';

const appReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  client: clientReducer,
  deleteVoting: deleteVotingReducer,
});

/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
  if (action.type === types.RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

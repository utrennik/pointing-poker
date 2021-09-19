import { combineReducers } from 'redux';
import { clientReducer } from './client-reducer';
import { gameReducer } from './game-reducer';
import { socketReducer } from './socket-reducer';
<<<<<<< HEAD

const rootReducer = combineReducers({
  socketError: socketReducer,
=======
import { types } from '../actions';

const appReducer = combineReducers({
  socket: socketReducer,
>>>>>>> 8d5cffa6437c25673a957437a8df58cc41ff41d0
  game: gameReducer,
  client: clientReducer,
});

/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
  if (action.type === types.RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

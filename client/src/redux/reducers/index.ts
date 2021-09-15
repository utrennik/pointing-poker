import { combineReducers } from 'redux';
import { gameReducer } from './game-reducer';
import { socketReducer } from './socket-reducer';

const rootReducer = combineReducers({
  socketConnected: socketReducer,
  game: gameReducer,
});

export default rootReducer;

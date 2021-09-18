import { combineReducers } from 'redux';
import { clientReducer } from './client-reducer';
import { gameReducer } from './game-reducer';
import { socketReducer } from './socket-reducer';

const rootReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  client: clientReducer,
});

export default rootReducer;

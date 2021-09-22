import { createStore, compose } from 'redux';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* eslint-enable */

const configureStore = () => createStore(rootReducer, composeEnhancers());

const store = configureStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;

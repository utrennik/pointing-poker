import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

/* eslint-disable no-underscore-dangle */

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* eslint-enable */

const persistedStore = loadFromLocalStorage();
const configureStore = () => createStore(rootReducer, { ...persistedStore }, composeEnhancers());

const store = configureStore();

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

import { changeTitle } from '@src/redux/actions';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const store = mockStore({});

describe('Store', () => {
  it('should dispatch expected action', () => {
    store.dispatch(changeTitle('Privet'));
    const expectedPayload = {
      type: 'CHANGE_TITLE',
      payload: {
        title: 'Privet',
      },
    };
    const actions = store.getActions();

    expect(actions).toEqual([expectedPayload]);
    expect(store.subscribe).not.toContain({});
  });
});

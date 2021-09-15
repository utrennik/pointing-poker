import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import WebSocketProvider from '@models/web-socket';

import App from './App.tsx';

import store from './redux/store';

render(
  <Provider store={store}>
    <WebSocketProvider>
      <Router>
        <App />
      </Router>
    </WebSocketProvider>
  </Provider>,
  document.getElementById('root')
);

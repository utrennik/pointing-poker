import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import WebSocketProvider from '@models/web-socket';

import App from './App.tsx';

import store from './redux/store';
import { theme } from './ThemeUI/theme';

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

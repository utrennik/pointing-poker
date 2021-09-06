import React from 'react';
import '@styles/main.sass';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const App: React.FC = () => (
  <div className="_container">
    <h3>
      Hello, pointing poker!
      <Icon color="primary">star</Icon>
    </h3>
    <Button variant="contained">Hello!</Button>
  </div>
);

export default App;

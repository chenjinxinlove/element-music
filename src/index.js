import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import store from './stores';
import routes from './router';
import theme from './theme';
import {ThemeProvider} from 'react-jss';

const router = (
  <Provider {...store}>
    {routes}
  </Provider>
);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    {router}
  </ThemeProvider>,
  document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import store from './stores';
import routes from './router';

const router = (
  <Provider {...store}>
    {routes}
  </Provider>
);
ReactDOM.render(router, document.getElementById('root'));

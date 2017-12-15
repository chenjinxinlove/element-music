import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Layout, Home} from '../pages';

const routes = (
  <Router>
    <div>
      <Layout>
        <Route path="/" component={Home} />
      </Layout>
    </div>
  </Router>
);

export default routes;
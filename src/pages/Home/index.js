import React from 'react';
import classes from './classes';
import injectSheet from 'react-jss';

class Home extends React.Component {
  render() {
    return (
      <div className={classes.container} ref="container">kkk</div>
    );
  }
}

export default injectSheet(classes)(Home);
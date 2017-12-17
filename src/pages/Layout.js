import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {observer} from 'mobx-react';

const classes = {
  container: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh'
  },

  mask: {
    filter: 'blur(10px)'
  }
};

@observer
class Layout extends Component {
  render() {
    return (
      <div className={classes.container} ref="container">
        {this.props.children}
      </div>
    );
  }
}

export default injectSheet(classes)(Layout);
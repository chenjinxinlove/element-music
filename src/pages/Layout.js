import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {observer, inject} from 'mobx-react';

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

@inject(stores => ({
  init: async() => {
    await stores.preferences.init();
    await stores.me.init();
  }
}))

@observer
class Layout extends Component {

  async componentWillMount() {
    await this.props.init();
  }

  render() {
    const {classes, children} = this.props;
    return (
      <div className={classes.container} ref="container">
        {children}
      </div>
    );
  }
}

export default injectSheet(classes)(Layout);
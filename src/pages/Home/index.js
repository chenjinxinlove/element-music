import React from 'react';
import classes from './classes';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';

import Loader from '../../components/Loader';

@inject(stores => ({
  loading: stores.home.loading
}))

@observer
@injectSheet(classes)
class Home extends React.Component {
  render() {
    const {classes, loading} = this.props;
    return (
      <div className={classes.container} ref="container">
        <Loader show={loading} text="请等待。。。" />
      </div>
    );
  }
}

export default Home;
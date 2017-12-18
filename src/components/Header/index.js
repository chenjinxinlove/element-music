import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
// import clazz from 'classnames';

import classes from './classes';

@injectSheet(classes)
@observer
export default class Header extends Component {
  static propTypes = {
    // follow: PropTypes.func,
    // followed: PropTypes.bool,
    showBack: PropTypes.bool,
    // showFav: PropTypes.bool,
    // showPlayList: PropTypes.bool,
    // showFollow: PropTypes.bool,
    color: PropTypes.string
  };

  static defaultProps = {
    showBack: true
  };

  goBack = () => history.goBack();

  renderBack() {
    let {showBack, color} = this.props;
    if (!showBack) {
      return false;
    }
    return (
      <i
        className="ion-android-arrow-back"
        onClick={e => this.goBack()}
        style={{
          color
        }}
      />
    );
  }

  render() {
    let classes = this.props.classes;
    return (
      <header className={classes.container}>
        <div>
          {
            this.renderBack()
          }
        </div>
        <div>
          <i
            className="ion-ios-arrow-down"
            onClick={e => console.log('最小化')}
            style={{
              color: this.props.color
            }}
          />
        </div>
      </header>
    );
  }
}
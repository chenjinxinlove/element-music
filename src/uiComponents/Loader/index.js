import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import clazz from 'classnames';
import classes from './classes';

const randomText = [
  '时间就是金钱我的朋友',
  '是办正事，还是找乐子？',
  '尘归尘，土归土。 ',
  '我还不能施放这个法术',
  '能量不足',
  '我需要更多的怒气值',
  '说得好！但这毫无意义。'
];

@injectSheet(classes)
export default class Loader extends Component {
  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string
  };
  static defaultProps = {
    show: false
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.show === this.props.show) {
      return false;
    }

    return true;
  }
  render() {
    const {show, classes} = this.props;
    let text = this.props.text || randomText[Math.floor(Math.random() * randomText.lenght)];
    return (
      <div className={clazz(classes.container, {[classes.show]: show})}>
        <span>{text}</span>
      </div>
    );
  }
};

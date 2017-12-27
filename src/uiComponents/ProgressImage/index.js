/**
 * Created by chenjinxin on 2017/12/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classes from './classes';

@injectSheet(classes)
export default class ProgressImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    thumb: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    fallback: PropTypes.string
  };

  static defaultProps = {
    fallback: 'https://source.unsplash.com/random'
  };

  componentWillReceiveProps(nextProps) {
    if (true
      && this.refs.container
      && nextProps.src !== this.props.src) {
      this.refs.container.classList.remove(this.props.classes.loaded);
    }
  }

  handleError(e) {
    e.target.src = this.props.fallback;
  }

  handleLoad(e) {
    let ele = this.refs.container;
    this.refs.thumb.style.paddingBottom = '0%';

    if (ele) {
      setTimeout(() => {
        ele.classList.add(this.props.classes.loaded);
      }, 50);
    }
  }

  render() {
    let {classes, src, thumb, height, width} = this.props;

    if (!src) return false;

    if (!thumb) {
      thumb = src.replace(/\?.*$/, '') + '?param=20y20';
    }

    return (
      <figure
        className={classes.container}
        ref="container"
        style={{
          height,
          width
        }}
      >
        <img
          className={classes.main}
          onError={e => this.handleError(e)}
          onLoad={e => this.handleLoad(e)}
          ref="image"
          src={this.props.src}
          style={{
            height,
            width
          }}
        />
        <div
          className={classes.thumb}
          ref="thumb"
          style={{
            paddingBottom: (height / width) * 100 || 0
          }}>
          <img {...{
            src: thumb,
            style: {
              height,
              width
            },
            onLoad(e) {
              e.target.classList.add(classes.loaded);
            }
          }} />
        </div>
      </figure>
    );
  }

}
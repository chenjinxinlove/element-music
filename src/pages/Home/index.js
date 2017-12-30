import React from 'react';
import classes from './classes';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import Scroller from 'react-scroll-horizontal';
import clazz from 'classnames';

import helper from '../../utils/helper';
import Loader from '../../uiComponents/Loader';
import Header from '../../components/Header';
import Controller from '../../components/Controller';

@injectSheet(classes)
@inject(stores => ({
  loading: stores.home.loading,
  playlist: stores.home.list,
  getPlaylist: stores.home.getList,
  naturalScroll: stores.preferences.naturalScroll,
  play: (playlist) => {
    let controller = stores.controller;
    controller.setup(playlist);
    controller.play();
  },
  toggle: stores.controller.toggle,
  isPlaying: (id) => {
    let controller = stores.controller;

    return controller.playing
      && controller.playlist.id === id;
  },
  canitoggle: (id) => {
    return stores.controller.playlist.id === id;
  }
}))
@observer
class Home extends React.Component {
  componentDidMount() {
    this.props.getPlaylist();
  }
  renderItem(item) {
    let {classes, isPlaying} = this.props;

    return (
      <a
        src={item.link}
        className={clazz('clearfix', {
          [classes.playing]: isPlaying(item.id),
        })}
      >
        <img src={item.cover} />
        <div className={classes.info}>
          <span className={classes.subtitle}>
            {
              item.type === 0
                ? `${helper.humanNumber(item.played)} 播放`
                : `${item.size} 音频`
            }
          </span>
          <div className={classes.title}>
            {item.name}
          </div>
        </div>
      </a>
    );
  }

  renderDaily(item) {
    let { classes, isPlaying, canitoggle, toggle, play } = this.props;
    let playing = isPlaying(item.id);

    return (
      <div
        className={clazz('clearfix', classes.daily, {
          [classes.playing]: playing,
        })}
        onClick={e => canitoggle(item.id) ? toggle() : play(item)}>
        <div className={classes.mask}>
          {
            playing
              ? <i className="ion-ios-pause" />
              : <i className="ion-ios-play" />
          }
        </div>

        <div className={classes.info}>
          <span className={classes.subtitle}>
            {item.size} Tracks
          </span>
          <div className={classes.title}>
            {item.name}
          </div>
        </div>
      </div>
    );
  }
  renderPlaylist() {
    let {classes, playlist, naturalScroll} = this.props;
    return (
      <Scroller reverseScroll={!naturalScroll}>
        {
          playlist.length === 0 ? '' : playlist.map((e, index) => {
            //  let isLiked = false;
            let isDaily = true && index === 0;

            return (
              <div className={clazz('clearfix', classes.item)} key={index}>
                {
                  isDaily ? this.renderDaily(e) : this.renderItem(e)
                }
              </div>
            );
          })
        }
      </Scroller>
    );
  }

  render() {
    const {classes, loading} = this.props;
    return (
      <div className={classes.container} ref="container">
        <Loader show={loading} text="请等待。。。" />
        <Header />
        <main>
          <div
            className={classes.logo}
            dangerouslySetInnerHTML={{__html: `
              <svg class="${classes.svg}">
                <defs>
                  <pattern id="mask" patternUnits="userSpaceOnUse" height="600" width="600">
                      <image xmlns:xlink="http://www.w3.org/1999/xlink" x="100px" y="-100px" xlink:href="http://tq121.weather.com.cn/ski/music/bgcolorful.jpg" width="600" height="600"></image>
                  </pattern>
                </defs>
                <text class="${classes.welcome}" text-anchor="middle" x="50%" y="0" dy="100px">欢迎</text>
              </svg>
            `}}
           />
          <div style={{
            marginTop: 20
          }}>
            {
              this.renderPlaylist()
            }
          </div>
        </main>

        <Controller />
      </div>
    );
  }
}

export default Home;
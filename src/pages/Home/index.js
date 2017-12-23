import React from 'react';
import classes from './classes';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import Scroller from 'react-scroll-horizontal';
import clazz from 'classnames';
// import {Link} from 'react-router';

import helper from '../../utils/helper';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

@injectSheet(classes)
@inject(stores => ({
  loading: stores.home.loading,
  playlist: stores.home.list,
  getPlaylist: stores.home.getList,
  naturalScroll: stores.preferences.naturalScroll,
}))
@observer
class Home extends React.Component {
  componentDidMount() {
    this.props.getPlaylist();
  }
  renderItem(item) {
    let {classes} = this.props;

    return (
      <a
        src={item.link}
        className={clazz('clearfix')}
      >
        <img src={item.cover} />
        <div className={classes.info}>
          <span className={classes.subtitle}>
            {
              item.type === 0
                ? `${helper.humanNunber(item.played)} 播放`
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

  // renderLiked(item) {
  //   return (
  //     item
  //   );
  // }

  // renderDaily(item) {
  //   return (
  //     item
  //   );
  // }
  renderPlaylist() {
    let {classes, playlist, naturalScroll} = this.props;
    return (
      <Scroller reverseScroll={!naturalScroll}>
        {
          playlist.length === 0 ? '' : playlist.map((e, index) => {
            // let isLiked = false;
            // let isDaily = false;

            return (
              <div className={clazz('clearfix', classes.item)} key={index}>
                {
                  this.renderItem(e)
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
      </div>
    );
  }
}

export default Home;
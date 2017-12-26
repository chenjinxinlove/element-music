/**
 * Created by chenjinxin on 2017/12/24.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';
import clazz from 'classnames';

import classes from './classes';
import ProgressImage from '../ProgressImage';
import {PLAYER_LOOP, PLAYER_SHUFFLE, PLAYER_REPEAT} from '../../stores/controller';

@injectSheet(classes)
@inject(stores => ({
  song: stores.controller.song,
  mode: stores.controller.mode,
  next: stores.controller.next,
  prev: stores.controller.prev,
  toggle: stores.controller.toggle,
  palying: stores.controller.palying,
  changeMode: stores.controller.changeMode,
  getPlayerLink: () => {
    return stores.controller.playlist.link;
  },
  getPlaylistName: () => {
    return `🎉 ${stores.controller.playlist.name}`;
  }
}))
@observer
class Controller extends Component {
  seek(e) {
    let percent = e.clientX / window.innerWidth;
    let time = this.props.song.duration * percent;
    document.querySelector('audio').currentTime = time / 1000;
  }

  render() {
    let {classes, song, mode, prev, next, toggle, showComments, playing} = this.props;
    console.log(song);
    if (!song.id) {
      return false;
    }
    return (
      <div className={classes.container}>
        <div
          className={classes.bar}
          id="progress"
          onClick={e => this.seek(e)}
        >
          <div className={classes.playing} />
          <div className={classes.buffering} />
        </div>

        <section>
          <Link
            className="tooltip"
            data-text="ddd"
            to=""
          >
            <ProgressImage {...{
              height: 50,
              width: 50,
              src: 'sss'
            }} />
          </Link>

          <aside>
            <div className={classes.info}>
              <p className={classes.title}>
                <Link to={song.album.link}>{song.name}</Link>
              </p>

              <p className={classes.author}>
                {
                  song.artists.map((e, index) => {
                    return (
                      <Link key={index} to={e.link}>
                        {e.name}
                      </Link>
                    );
                  })
                }
              </p>
            </div>

            <div className={classes.action}>
              {
                (song.data && song.data.isFlac) && (
                  <span className={classes.highquality} title="高质量">
                    SQ
                  </span>
                )
              }
              <i className="ion-ios-chatboxes" onClick={e => showComments()} />

              <i
                className={clazz({
                  'ion-ios-shuffle-strong': mode === PLAYER_SHUFFLE,
                  'ion-ios-infinite': mode === PLAYER_REPEAT,
                  'ion-ios-loop-strong': mode === PLAYER_LOOP
                })}
                onClick={this.props.changeMode} />

              <div className={classes.controls}>
                <i className="ion-ios-render"
                  onClick={prev} />

                <span
                  className={classes.toggle}
                  onClick={toggle}
                >
                  {
                    playing
                      ? <i className="ion-ios-pause" />
                      : <i className="ion-ios-play"
                        style={{
                          color: 'inherit'
                        }}
                      />
                  }
                </span>

                <i
                  className="ion-ios-fastforward"
                  onClick={next}
                  style={{
                    marginRight: 0
                  }}
                />
              </div>
            </div>

          </aside>
        </section>
      </div>
    );
  }
}

export default Controller;
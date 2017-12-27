import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import helper from '../../utils/helper';

@inject(stores => ({
  song: stores.controller.song,
  next: stores.controller.next,
  play: () => stores.controller.play(stores.controller.song.id),
  playing: stores.controller.playing,
  volume: stores.preferences.volume,
  setVolume: stores.preferences.setVolume
}))
@observer
export default class AudioPlayer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== this.props.playing) {
      try {
        if (!this.refs.player.src) {
          this.props.play();
        } else {
          this.refs.player[nextProps.playing ? 'play' : 'pause']();
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  passed = 0;

  progress(currentTime = 0) {
    let duration = this.props.song.duration;
    if (currentTime * 1000 - this.passed < 1000) {
      return;
    }
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      let ele = document.querySelector('#progress');

      if (ele) {
        let percent = (currentTime * 1000) / duration;

        ele = ele.firstElementChild;
        ele.style.transform = `translate3d(${-100 + percent * 100}%, 0, 0)`;
        ele.setAttribute('data-time', `${helper.getTime(currentTime * 1000)} / ${helper.getTime(duration)}`);

        this.buffering();
      }
    }, 450);

    this.passed = currentTime * 1000;
  }

  buffering() {
    let ele = document.querySelector('#progress');
    let player = this.refs.player;

    if (ele && player.buffered.length) {
      let buffered = player.buffered.end(player.buffered.length - 1);

      if (buffered >= 100) {
        buffered = 100;
      }
      ele.lastElementChild.style.transform = `translate3d(${-100 + buffered}%, 0, 0)`;
    }
  }

  resetProgress() {
    this.passed = 0;
  }

  render() {
    let song = this.props.song.data || {};

    return (
      <audio
        autoPlay={true}
        onAbort={e => {
          this.passed = 0; this.progress();
        }}
        onEnded={e => {
          this.passed = 0; this.props.next(true);
        }}
        onError={e => console.log(e)}
        onProgress={e => this.buffering(e)}
        onSeeked={e => this.resetProgress()}
        onTimeUpdate={e => this.progress(e.target.currentTime)}
        ref="player"
        src={song.src}
        style={{
          display: 'none'
        }}
      />
    );
  }
}
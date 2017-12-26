import {observable, action} from 'mobx';
import axios from 'axios';

import preferences from './preferences';

const PLAYER_SHUFFLE = 0;
const PLAYER_REPEAT = 1;
const PLAYER_LOOP = 2;
const MODES = [PLAYER_SHUFFLE, PLAYER_REPEAT, PLAYER_LOOP];

class Controller {
  @observable playing = false;
  @observable mode = PLAYER_SHUFFLE;

  @observable playlist = {};

  @observable song = {};

  history = [];

  @action async setup(playlist) {
    if (self.playlist.id === playlist.id && playlist.id !== 'PERSONAL_FM') {
      return;
    }

    self.playing = false;
    self.history = [];

    self.playlist = JSON.parse(JSON.stringify(playlist));
    self.song = playlist.songs[0];
  }

  @action async play(songid, forward = true) {
    let songs = self.playlist.songs;
    let song;

    if (songid) {
      song = songs.find(e => e.id === songid);
    }

    song = song || songs[0];

    if (!self.history.includes(songid)) {
      self.history[forward ? 'push' : 'unshift'](song.id);
    }
    // if (self.playlist.id === 'PERSONAL_FM') {
    //
    // }

    self.song = song;
    self.playing = true;
    await self.resolveSong();
  }

  @action async resolveSong() {
    let song = self.song;
    let response = await axios.get(`/api/player/song/${song.id}/${song.name}/${song.artists.map(e => e.name).join(',')}/${preferences.highquality}?` + +new Date());
    let data = response.data.song;

    if (!data.src) {
      console.error('Bad audio src.');
      self.next();
      return;
    }

    self.song = Object.assign({}, self.song, { data });
  }

  @action async next(loop = false) {
    let songs = self.playlist.songs;
    let history = self.history;
    let index = history.indexOf(self.song.id);
    let next;

    switch (true) {
      case loop === true
        && self.mode === PLAYER_LOOP:
        next = self.song.id;
        break;

      case self.playlist.id = 'PERSONAL_FM':
        // fm.next();
        return;

      case ++index < history.length:
        next = history[index];
        break;

      case self.mode !== PLAYER_SHUFFLE:
        let song;

        index = songs.findIndex(e => e.id === self.song.id);

        if (++index < songs.length) {
          song = songs[index];
        } else {
          song = songs[0];
        }

        next = song.id;
        break;
      default:
        songs = songs.filter(e => !history.includes(e.id));

        if (songs.length) {
          next = songs[Math.floor(Math.random() * songs.length)]['id'];
        } else {
          next = history[0];
        }
    }

    await self.play(next);
  }

  @action async prev() {
    let history = self.history;
    let index = history.indexOf(self.song.id);

    if (--index >= 0) {
      await self.play(history[index], false);
      return;
    }

    if (self.mode === PLAYER_SHUFFLE) {
      let songs = self.playlist.songs.filter(e => history.indexOf(e.id) === -1);
      let index = Math.floor(Math.random() * songs.length);
      let song = songs[index];

      if (!songs.length) {
        await self.play(history[history.length - 1]);
        return;
      }
      await self.play(song.id, false);
      return;
    }

    index = self.playlist.songs.findIndex(e => e.id === self.song.id);

    if (--index < 0) {
      index = self.playlist.songs.length - 1;
    }

    await self.paly(self.playlist.songs[index]['id'], false);
  }

  @action pause() {
    self.playing = false;
  }

  @action toggle() {
    self.palying = !self.playing;
  }

  @action changeMode(mode = PLAYER_REPEAT) {
    let index = MODES.indexOf(self.mode);

    if (MODES.includes(mode)) {
      self.mode = mode;
    } else {
      if (++index < MODES.length) {
        self.mode = MODES[index];
      } else {
        self.mode = PLAYER_SHUFFLE;
      }
    }
  }
}

const self = new Controller();
export {PLAYER_LOOP, PLAYER_SHUFFLE, PLAYER_REPEAT};
export default self;
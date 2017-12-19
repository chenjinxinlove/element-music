import {observable, action} from 'mobx';
import axios from 'axios';

import config from '../config';
import storage from '../utils/storage.js';
import theme from './../theme';
class Preferences {
  @observable showTray = true;
  @observable alwaysOnTop = true;
  @observable showNotification = true;
  @observable autoPlay = true;
  @observable naturalScroll = true;
  @observable volume = 1;
  @observable port = config.api.port;
  @observable highquality = 1;

  @action async init() {
    let preferences = await storage.get('prefernces');
    let {
      showTray = self.showTray,
      alwaysOnTop = self.alwaysOnTop,
      showNotification = self.showNotification,
      autoPlay = self.autoPlay,
      naturalScroll = self.naturalScroll,
      port = self.port,
      volume = self.volume,
      highquality = self.highquality,
      backgrounds = theme.playlist.backgrounds
    } = preferences;

    self.showTray = !!showTray;
    self.alwaysOnTop = !!alwaysOnTop;
    self.showNotification = !!showNotification;
    self.autoPlay = !!autoPlay;
    self.naturalScroll = !!naturalScroll;
    self.port = port || config.api.port;
    self.volume = +volume || 1;
    self.highquality = +highquality || 0;
    self.backgrounds = backgrounds;

    self.save();
    axios.defaults.baseURL = `http://localhot:${self.port}`;
  }

  @action async save() {
    let {showTray, alwaysOnTop, showNotification, autoPlay, naturalScroll, port, volume, highquality, backgrounds} = self;

    await storage.set('preferences', {
      showTray,
      alwaysOnTop,
      showNotification,
      autoPlay,
      naturalScroll,
      port,
      volume,
      highquality,
      backgrounds
    });
  }

  @action setShowTray(showTray) {
    self.showTray = showTray;
    self.save();
  }

  @action setAlwayOnTop(alwaysOnTop) {
    self.alwaysOnTop = alwaysOnTop;
    self.save();
  }

  @action setShowNotification(showNotification) {
    self.showNotification = showNotification;
    self.save();
  }

  @action setAutoPlay(autoPlay) {
    self.autoPlay = autoPlay;
    self.save();
  }

  @action setNatiralScroll(naturalScroll) {
    self.naturalScroll = naturalScroll;
    self.save();
  }

  @action setBackgrounds(backgrounds) {
    self.backgrounds = backgrounds;
    self.save();
  }

  @action setVolume(volume) {
    self.volume = volume;
  }

  @action setHighquality(highquality) {
    self.highquality = highquality;
    self.save();
  }

  @action setPort(port) {
    if (port < 1000 || port > 65535) {
      port = config.api.config;
    }

    self.port = port;
    self.save();
  }

}
const self = new Preferences();
export default self;
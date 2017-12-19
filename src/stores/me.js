import {observable, action} from 'mobx';
import axios from 'axios';
import storage from '../utils/storage';

class Me {
  @observable initialized = false;
  @observable profile = {};

  @action async init() {
    let profile = await storage.get('profile');
    if (!profile) {
      self.profile = {};
      self.initialized = true;
      return false;
    }

    await axios.get('/login/refresh');

    self.profile = profile;
    self.initialized = true;
  }
}

const self = new Me();
export default self;
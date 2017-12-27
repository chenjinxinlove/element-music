import {observable, action} from 'mobx';
import axios from 'axios';
import preferences from './preferences';
import controller from './controller';
class Home {
  @observable loading = false;
  @observable list = [];
  @action async load() {
    let res;
    res = await axios.get(`api/home`);
    self.list = res.data.list;
    controller.setup(res.data.list[0]);
    if (preferences.autoPlay) {
      controller.play();
    } else {
      controller.song = controller.playlist.songs[0];
    }
    return self.list;
  }
  @action async getList() {
    self.loading = true;

    await self.load();
    // self.getList = Function;
    self.loading = false;
  }
}
const self = new Home();
export default self;
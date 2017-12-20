import {observable, action} from 'mobx';
import axios from 'axios';

class Home {
  @observable loading = false;
  @observable list = [];
  @action async load() {
    let res;
    res = await axios.get(`home`);
    self.list = res.data.list;
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
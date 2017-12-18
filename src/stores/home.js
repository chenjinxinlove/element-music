import {observable} from 'mobx';

class Home {
    @observable loading = false;
}
const self = new Home();
export default self;
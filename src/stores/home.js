import {observable} from 'mobx';

class Home {
    @observable loading = true;
}
const self = new Home();
export default self;
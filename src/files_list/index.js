import getData from './firebase_get_data';
import onClick from './on_click';
require('./style.scss');

export default {
    template: require('./template.html'),
    action() {
        getData({
            id: '/files/1',
            title: 'home'
        });
        onClick()
    }
}

import file from './file';
import folder from './folder';
import photo from './photo';
import audio from './audio';
import note from './note';

export default {
    el: '#footer',
    template: require('./template.html'),
    afterBind() {
        let btnCollection = document.querySelectorAll('#footer a');

        btnCollection.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let element = e.target;

                if (element.tagName == 'I') {
                    element = e.target.parentElement;
                }

                if (element.tagName == 'A') {
                    switch (element.dataset.uploadType) {
                        case 'file':
                            file()
                            break;
                        case 'folder':
                            folder();
                            break;
                        case 'photo':
                            photo();
                            break;
                        case 'audio':
                            audio();
                            break;
                        case 'note':
                            note();
                            break;
                    }
                }
            });
        })
    }
}

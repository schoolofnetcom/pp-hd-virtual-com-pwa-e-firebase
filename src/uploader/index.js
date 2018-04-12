import file from './file';
import folder from './folder';

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
                            console.log('tira foto');
                            break;
                        case 'audio':
                            console.log('grava audio');
                            break;
                        case 'note':
                            console.log('cria anotação');
                            break;
                    }
                }
            });
        })
    }
}

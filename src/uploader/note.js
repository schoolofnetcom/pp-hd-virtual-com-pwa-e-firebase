import uploader from './utils/uploader';

let template = document.createElement('template');
template.innerHTML = require('./note/template.html');
template = template.content.childNodes;
document.querySelector('body').appendChild(template[0])

require('./note/style.scss');

document.getElementById('note-cancel').addEventListener('click', (e) => {
    e.preventDefault();

    let noteModal = document.getElementById('note');
    noteModal.className = 'modal';
})

document.getElementById('note-save').addEventListener('click', function (e) {
    e.preventDefault();
    let data = [document.getElementById('note-text').value];
    let blob = new Blob(data, { encoding:"UTF-8", type: 'text/plain;charset=UTF-8' });

    let name = Math.random().toString(36).substring(2);
    name += '.txt';

    uploader(blob, name);
    document.getElementById('note-cancel').click();
})

export default function () {
    let noteModal = document.getElementById('note');
    noteModal.className = 'modal open';
}

import uploader from './utils/uploader';

require('./file/dragAndDrop');

export default function () {
    let fileInput = document.getElementById('file');
    fileInput.click();
    fileInput.addEventListener('change', function (e) {
        uploader(e.target.files[0], e.target.files[0].name);
    });
}

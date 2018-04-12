import { app } from '../firebase';
import getPath from './utils/path';

export default function () {
    let path = getPath()
    let fileInput = document.getElementById('file');
    fileInput.click();
    fileInput.addEventListener('change', function (e) {
        const storageRef = app.storage().ref();
        let fileRef = storageRef.child('files/1' + path + e.target.files[0].name);
        fileRef.put(e.target.files[0]).then((snapshot) => {
            let folderRef = app.database().ref('files/1' + path);
            folderRef.push({
                type: 'file',
                title: e.target.files[0].name,
                url: snapshot.downloadURL
            })
        })
    });
}

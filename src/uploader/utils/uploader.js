import { app } from '../../firebase';
import getPath from './path';

export default function (file, name) {
    let path = getPath();
    const storageRef = app.storage().ref();
    let fileRef = storageRef.child('files/1' + path + name);

    fileRef.put(file).then((snapshot) => {
        let folderRef = app.database().ref('files/1' + path);
        folderRef.push({
            type: 'file',
            title: name,
            url: snapshot.downloadURL
        })
    })
}

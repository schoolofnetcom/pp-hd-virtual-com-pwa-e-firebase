import { app } from '../../firebase';
import getPath from './path';
import { UserClass } from '../../auth/user';

export default function (file, name) {
    let path = getPath();
    const storageRef = app.storage().ref();

    let userInstance = new UserClass;

    let fileRef = storageRef.child('files/' + userInstance.user.uid + path + name);

    fileRef.put(file).then((snapshot) => {
        let folderRef = app.database().ref('files/' + userInstance.user.uid + path);

        folderRef.push({
            type: 'file',
            title: name,
            url: snapshot.downloadURL,
            size: snapshot.totalBytes
        })

        let totalBytes = snapshot.totalBytes;

        let userRef = app.database().ref('/users/' + userInstance.user.uid + '/usage')

        userRef.once('value', (snapshot) => {
            let size = snapshot.val() || 0;
            userRef.set(totalBytes + size);
        }, err => console.log(err));
    })
}

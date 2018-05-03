import getPath from './utils/path';
import { app } from '../firebase';
import { UserClass } from '../auth/user';

export default function () {
    let dirName = prompt('Qual o nome do novo diretório', 'Minha pasta')
    if (dirName == null || dirName == '') {
        return;
    }

    let path = getPath()

    let userInstance = new UserClass;

    let folderRef = app.database().ref('files/' + userInstance.user.uid + path);
    folderRef.push({
        type: 'folder-open',
        title:  dirName
    })
}

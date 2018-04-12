import getPath from './utils/path';
import { app } from '../firebase';

export default function () {
    let dirName = prompt('Qual o nome do novo diretório', 'Minha pasta')
    if (dirName == null || dirName == '') {
        return;
    }

    let path = getPath()

    let folderRef = app.database().ref('files/1' + path);
    folderRef.push({
        type: 'folder-open',
        title:  dirName
    })
}

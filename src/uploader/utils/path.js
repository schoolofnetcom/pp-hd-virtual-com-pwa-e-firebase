import { foldersPath } from '../../files_list/firebase_get_data';

export default function () {
    let path = '/';

    foldersPath.forEach((item, key) => {
        if (key > 0) {
            path += item.id + '/'
        }
    })

    return path;
}

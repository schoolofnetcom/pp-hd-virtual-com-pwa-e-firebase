import { app } from '../firebase';
import getData from './update_data';

let foldersPath = [];

export default function (ref) {
    let pos = foldersPath.findIndex((e) => e.id == ref.id);
    if (pos == -1) {
        foldersPath.push(ref);
    } else {
        foldersPath = foldersPath.slice(0, pos + 1);
    }

    let firebase_ref = '';
    let breadcrumbs = '';

    for (let index in foldersPath) {
        firebase_ref += foldersPath[index].id + '/';
        breadcrumbs += ` / <a href="" data-type="folder-open" data-fid="${foldersPath[index].id}" data-title="${foldersPath[index].title}">${foldersPath[index].title}</a>`;
    }

    let database = app.database();
    let filesRef = database.ref(firebase_ref);
    filesRef.on('value', getData)

    document.querySelector('#path').innerHTML = breadcrumbs;
}

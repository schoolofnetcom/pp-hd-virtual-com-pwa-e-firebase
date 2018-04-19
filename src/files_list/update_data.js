export default function (snapshot) {
    let data = snapshot.val();
    data = Object.entries(data);

    let partial = require('./partial.html');

    let file = [];
    let folder = [];
    data.forEach((item, key) => {
        if (typeof item[1] != 'object') {
            data.splice(key);
        }

        if (item[1].type == 'folder-open') {
            folder.push(item);
        } else {
            file.push(item);
        }
    })

    file.sort((a, b) => a[1].title.localeCompare(b[1].title));
    folder.sort((a, b) => a[1].title.localeCompare(b[1].title));

    data = folder.concat(file);

    let html = '';
    for (let index in data) {
        if (typeof data[index][1] != 'object') {
            continue;
        }
        html += partial
            .replace(/{{ fid }}/g, data[index][0])
            .replace(/{{ title }}/g, data[index][1].title)
            .replace(/{{ type }}/g, data[index][1].type)
            .replace(/{{ url }}/g, data[index][1].url);
    }

    document.querySelector('#main .files').innerHTML = html;
}

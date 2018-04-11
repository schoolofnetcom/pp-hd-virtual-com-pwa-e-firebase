import getData from './firebase_get_data';

export default function () {
    let onClick = (e) => {
        e.preventDefault();
        let element = e.target;

        if (e.target.tagName == 'I') {
            element = e.target.parentElement;
        }

        if (element.tagName == 'A') {
            if (element.dataset.type == 'folder-open') {
                getData({
                    id: element.dataset.fid,
                    title: element.dataset.title
                });
            } else {
                console.log('download do arquivo');
            }
        }
    }

    document.querySelector('#main').addEventListener('click', onClick)
}

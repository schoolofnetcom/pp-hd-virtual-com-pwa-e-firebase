import uploader from './utils/uploader';

require('./photo/style.scss');

let template = document.createElement('template');
template.innerHTML = require('./photo/template.html');
template = template.content.childNodes;
document.querySelector('body').appendChild(template[0])

let streamVideo;

const startVideo = function (id) {

    let config = {
        video: {deviceId: id},
        audio: false
    }

    let video = document.createElement('video');
    document.getElementById('photo-viewer').appendChild(video);

    video.addEventListener('click', function (e) {
        let photo = new ImageCapture(streamVideo.getTracks()[0]);
        photo.takePhoto()
            .then((blob) => {
                let name = Math.random().toString(36).substring(2);
                name += '.png';

                uploader(blob, name);
                document.getElementById('photo-cancel').click();
            });
    })

    let success = (stream) => {
        streamVideo = stream;
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }

    navigator.getUserMedia(config, success, (err) => console.log(err));
}

document.getElementById('photo-cancel').addEventListener('click', function (e) {
    e.preventDefault();

    let photoModal = document.getElementById('photo');
    photoModal.className = 'modal';

    let video = document.querySelector('#photo-viewer video');

    if (video) {
        video.remove();
    }

    if (streamVideo) {
        streamVideo.getTracks()[0].stop();
    }

    document.getElementById('photo-choice').setAttribute('style', '');
})

navigator.mediaDevices.enumerateDevices().then((devices) => {
    let options = [];
    devices.forEach((device) => {
        if (device.kind == 'videoinput') {
            options.push(device);
        }
    });

    let menuCamera = document.querySelector('#photo-choice .menu-camera');
    let partialTemplate = menuCamera.innerHTML;

    let html = '';
    options.forEach((device) => {
        let label = device.label || 'Camera';
        html += partialTemplate
            .replace(/{{ id }}/g, device.deviceId)
            .replace(/{{ label }}/g, label);
    })

    menuCamera.innerHTML = html;

    document.querySelector('#photo-choice .menu-camera a').addEventListener('click', function (e) {
        e.preventDefault();
        startVideo(e.target.dataset.camera);
        document.getElementById('photo-choice').setAttribute('style', 'display: none');
    })
})

export default function () {
    let photoModal = document.getElementById('photo');
    photoModal.className = 'modal open';
}

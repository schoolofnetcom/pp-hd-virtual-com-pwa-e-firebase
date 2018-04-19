import uploader from './utils/uploader';

let streamAudio;
let recorder;

const audioRecorder = function () {
    recorder = new MediaRecorder(streamAudio);
    let chuncks = [];

    recorder.ondataavailable = (event) => {
        chuncks.push(event.data);
    }

    recorder.onstop = () => {
        let blob = new Blob(chuncks, { type: 'video/webm'})
        chuncks = [];

        let name = Math.random().toString(36).substring(2);
        name += '.ogg';

        uploader(blob, name);
    }

    recorder.start();
}

export default function () {
    if (streamAudio) {
        streamAudio.getTracks()[0].stop();
        recorder.stop();
        console.log('parando audio')
    } else {
        let config = {
            video: false,
            audio: true
        }

        let success = function (stream) {
            streamAudio = stream;
            audioRecorder();
            console.log('reproduzindo audio')
        }

        navigator.getUserMedia(config, success, (err) => console.log(err));
    }
}

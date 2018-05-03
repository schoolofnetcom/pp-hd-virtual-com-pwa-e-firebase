import { app } from '../firebase';
import { UserClass } from '../auth/user';

export default function (value) {
    const sha1 = require('js-sha1');

    let ref = app.database().ref('/sharer/' + sha1(value));
    ref.once('value', (snapshot) => {
        if (snapshot.val()) {
            const userInstante = new UserClass();
            let ref2 = app.database().ref('/shared/' + snapshot.val() + '/' + userInstante.user.uid);
            ref2.set({
                uid: userInstante.user.uid,
                email: userInstante.user.email
            });
        } else {
            alert('Email não cadastrado');
        }
    })
}

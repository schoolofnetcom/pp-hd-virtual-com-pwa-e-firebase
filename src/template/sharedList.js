import { app } from '../firebase';

app.auth().onAuthStateChanged(function (user) {
    if (user) {
        let ref = app.database().ref('/shared/' + user.uid);

        ref.on('value', (snapshot) => {
            let sharedList = snapshot.val();

            let html = '';
            for (let index in sharedList) {
                html += '<li><a href="?drive=' + sharedList[index].uid + '&email=' + sharedList[index].email + '">' + sharedList[index].email +  '</a></li>';
            }

            if (html != '') {
                html += '<li><a href="/">Ver o meu</a></li>';
                document.getElementById('shared-list').innerHTML = html;
            }
        })
    }
});

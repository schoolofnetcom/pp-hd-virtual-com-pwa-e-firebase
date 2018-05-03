import { app } from '../firebase';

app.auth().onAuthStateChanged(function (user) {
    if (user) {
        const database = app.database();
        let ref = database.ref('/users/' + user.uid + '/usage');
        ref.on('value', (snapshot) => {
            let totalUsage = snapshot.val() * 100 / 1073741824;
            totalUsage = Math.round(totalUsage);
            let totalFree = 100 - totalUsage;

            document.querySelector('.progress .usage').innerHTML = totalUsage + '% usado';
            document.querySelector('.progress .free').innerHTML = totalFree + '% livre';

            document.querySelector('.progress').setAttribute('style', 'grid-template-columns: ' + totalUsage + '% ' + totalFree + '%;')
        })
    }
});

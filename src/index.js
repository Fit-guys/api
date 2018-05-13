const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path              = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const router = require('./routes');
app.use('/', router);
app.listen(port, host);

const db = admin.database();

app.use('/id_users', router);
app.get('/users', (req, res) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Headers", "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Origin", "*");
    db.ref('/users/' + req.param('uid')).once('value').then((snapshot) => {
            res.send(snapshot.val().progress);
        }
    );
});
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save',(req, res) => {
    const uid = req.body.uid;
    const newProgress = req.body.progress;
    const updates = {};

    updates['/users/' + uid + '/progress'] = newProgress;
    db.ref().update(updates);

    console.log('Sent progress change request for uid = {' + uid + '} and new progress is {' + newProgress + '}.');

    res.end('ti hule tut progress menyaesh sobaka sutulaya???'); // ... 
});


console.log(`Server listening at ${host}:${port}`);

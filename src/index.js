const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const router = require('./routes');
app.use('/', router);
app.listen(port, host);

const db = admin.database();

app.get('/users', (req, res) => {
    db.ref('/users/' + req.param('uid')).once('value').then((snapshot) => {
            res.send(snapshot.val().progress);
        }
    );
});

app.post('/save',(req, res) => {
    const uid = req.body.uid;
    const newProgress = req.body.progress;
    const updates = {};

    updates['/users/' + uid + '/progress'] = newProgress;
    db.ref().update(updates);

    console.log('Sent progress change request for uid = {' + uid + '} and new progress is {' + newProgress + '}.');

    res.end('ti hule tut progress menyaesh sobaka sutulaya???');
});


console.log(`Server listening at ${host}:${port}`);

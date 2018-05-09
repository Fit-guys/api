const express = require('express');
const router = express.Router('firebase');
const admin = require('./firebase-admin');
const firebaseMiddleware = require('express-firebase-middleware');
const bp = require('body-parser');

const db = admin.database();

router.use((req, res, next) => {
    next();
});

router.use('/api', firebaseMiddleware.auth);

router.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});

router.get('/api/hello', (req, res) => {
    res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
    });
});

module.exports = router;

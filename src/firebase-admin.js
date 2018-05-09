const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKeys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://cyber-unicorns-game1.firebaseio.com'
});

console.log('Firebase Admin Initialized');

module.exports = admin;

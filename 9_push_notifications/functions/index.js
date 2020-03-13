var functions = require('firebase-functions');
var admin = require('firebase-admin');
var cors = require('cors')({ origin: true });
var webpush = require('web-push');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount),
  databaseURL: 'https://pwa-learning-a4603.firebaseio.com'
});

exports.storePostData = functions.https.onRequest(function (request, response) {
  cors(request, response, function () {
    admin.database().ref('posts').push({
      id      : request.body.id,
      title   : request.body.title,
      location: request.body.location,
      image   : request.body.image
    })
      .then(function () {
        webpush.setVapidDetails('mailto: strateg4k@gmail.com', 'BKpTja1Oq-EN3ISEzgBn1jpDImu5rY_EmECIdbuZZtRqwesqMDGVDp5drv7jhTa2wRpUgjo0DJOv3O1jhChjjao', 'CySGQIjMbmd_3gPar6Pd4qHljQBsGDz3QX3NkMI92D8');
        return admin.database().ref('subscriptions').once('value');
      })
      .then(function (subscriptions) {
        subscriptions.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            },
          };

          webpush.sendNotification(pushConfig, JSON.stringify({
            title: 'New Post',
            content: 'New Post added!',
            openUrl: '/help',
          }))
            .catch(function(err) {
              console.log('Error', err);
            });
        });

        response.status(200).json({ message: 'Data stored', id: request.body.id });
      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });
  });
});

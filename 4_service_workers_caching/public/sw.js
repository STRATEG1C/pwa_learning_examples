self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);

  // Initialize cache, open cache process
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');

        // Make request to the file, download it and store to be offline
        // Here we only store
        // Here we cache request URLs

        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');

        // Add all URLs in array
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/promise.js',
          '/src/js/fetch.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  // Here we retrieve cached files
  event.respondWith(
    // Check if we have requested file
    caches.match(event.request)
      .then(function(response) {
        // If have then load it
        if (response) {
          return response;
        } else {
          // Else, continue request to server
          return fetch(event.request)
            // Dynamic caching implementation
            .then(function(res) {
              caches.open('dynamic')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            });
        }
      })
  );


});
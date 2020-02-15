// Lifecicle events

// SW installation event
self.addEventListener('install', function(event) {
	console.log('[Service Worker]: Installing Service Worker ...', event);
});

// SW activation event
self.addEventListener('activate', function(event) {
	console.log('[Service Worker]: Activating Service Worker ...', event);
	return self.clients.claim();
});

/***************************************/

// Other events

self.addEventListener('fetch', function(event) {
	console.log('[Service Worker]: Fetching something ...', event);

	// Here we can override any responses
	event.respondWith(fetch(event.request));
});

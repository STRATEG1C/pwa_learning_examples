// SW registration process

// Check if browser support a SW
if ('serviceWorker' in navigator) {
	// SW registration
	navigator.serviceWorker
		// SW file specifying
		.register('/sw.js')
		.then(function() {
			// Code after registration
			console.log('Service worker registered!');
		});
}

/*******************************************************/


// Manipulating with installation of PWA

var deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
	console.log('beforeinstallprompt fired', event);
	event.preventDefault();

	deferredPrompt = event;
	return false;
})

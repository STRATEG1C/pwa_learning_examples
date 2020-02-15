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
		})
		.catch(function(err) {
			console.log(err);
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
});

var promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		// resolve('This is executed once timer is done');
		reject({ code: 500, message: 'An error occured!' });
		// console.log('This is executed once timer is done');
	}, 3000);
});

/********************** Fetch API ***********************/
// GET
fetch('https://httpbin.org/ip')
	.then(function(response) {
		console.log(response);
		return response.json();
	})
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});

//POST
fetch('https://httpbin.org/post', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	mode: 'cors', // default already is. Second value is no-cors
	body: JSON.stringify({ message: 'Does this work?' })
})
	.then(function(response) {
		console.log(response);
		return response.json();
	})
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});

// promise.then(function(text) {
// 	return text;
// }, fucntion(error) {
// 	console.log(error.code, error.message);
// }).then(function(newText) {
// 	console.log(newText);
// });

promise.then(function(text) {
	return text;
}).catch(function(error) {
	console.log(error.code, error.message);
});

console.log('This is executed reight after setTimeout()');

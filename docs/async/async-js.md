---
sidebar_position: 3
---

# Asynchronous JavaScript

### Async Vanilla JS

-   js code runs on a single thread
-   synchronous code waits for 1 action to complete before moving on to the next
-   do not wait for some callback-function
-   synchronous request waits for the response to return before executing the next instruction/code

-   asynchronous request set a request and while waiting for the response proceed to the next instruction/code
-   a callback-function will fire when the asynchronous request has been returned and completed
-   the asynchronous request will be pass to another thread outside js tread (cause js runs in a single thread) and proceed to the next instruction/code

-   ways to control asynchronous requests:
-   callbacks, promises, generators

-   grabbing data from somewhere and bringing it back(by making ajax request), without loading the page
-   communicate with a server by making http request

```js
// using vanilla js to make a request
window.onload = function () {
	// making a new xml http request object
	var xhttp = new XMLHttpRequest(); // allow us to make http request and get back data from the server
	// making the request using methods from the object (in this case "xhttp" object)
	// parameters: type of request, location of data(url), synch or asynch type(true = asynch, false = synch)
	xhttp.open('GET', 'data/tweets.json', true); // open(), method to setup the request
	xhttp.send(); // send(), send the request and grab the data back

	console.log(xhttp); // log the data response from the server
};

// listening to the readyState of the request
// object (XMLHttpRequest) has different ready state value while processing
/* ready states and value:
	0 - request not initialized
	1 - request has been set up
	2 - request has been sent
	3 - request is in process (grabbing the data)
	4 - request is complete (data has been returned)
*/
window.onload = function () {
	var xhttp = new XMLHttpRequest();

	// listening to the state changes while being made
	// the function will fire everytime the readyState is changing
	xhttp.onreadystatechange = function () {
		console.log(xhttp); // log the response everytime readyState changes
	};

	xhttp.open('GET', 'data/tweets.json', true);
	xhttp.send();
};

window.onload = function () {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		// listening when the readyState value is 4 (meaning the data is retrieve and the request is completed)
		// and the status is 200 (meaning "OK", 404 is "not found")
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(JSON.parse(xhttp.response)); // getting the data and parsing it to a json object format (using JSON.parse())
		}
	};

	xhttp.open('GET', 'data/tweets.json', true); // you can change the boolean type by false to make the behavior synchronous (bad practice and deprecated)
	xhttp.send();
	// when using asychronous js behavior,
	// the request will be sent outside js thread and will execute the next line of instruction while waiting for the server response
};

// callback-function
// runs when the request has been completed
// synchronous way, the callback-function will be called synchronously
// it will call the function right away and then proceed to the next line of code/instruction
window.onload = function () {
	var fruits = ['banana', 'apple', 'pear'];
	// callback-function was pass to the parameter of the forEach() method
	// passing the values of items in the array
	fruits.forEach(function (data) {
		console.log(data);
	});
};

// another way of calling callback-function is by giving it a name
window.onload = function () {
	var fruits = ['banana', 'apple', 'pear'];
	// callback-function was pass to the parameter of the forEach() method
	// passing the values of items in the array
	function callBack(data) {
		console.log(data);
	}

	fruits.forEach(callBack);
};
```

### JavaScript Promises

-   organize callbacks in a much easier to maintain
-   promise, is an object that represent an action that hasn't finish yet but will do at some point down the line
-   placeholder for somekind of asynchronous operation
-   when a http request is sent a promise object will return before the requested data is retrieve and return
-   within the promise you can register a callback that will run when the request is complete
-   using native promise library (note: there more promises library such as "Q" which supports all browser)

```js
window.onload = function () {
	// creating the function that will pass the url
	function get(url) {
		// return the promise object before the request has been completed
		return new Promise(function (resolve, reject) {
			// the function will pass the resolve and reject parameters and return the value

			var xhttp = new XMLHttpRequest();
			xhttp.open('GET', url, true);
			// .onload(), no need to worry about the readyState change

			xhttp.onload = function () {
				if (xhttp.status == 200) {
					resolve(JSON.parse(xhttp.response));
				} else {
					reject(xhttp.statusText);
				}
			};

			xhttp.onerror = function () {
				reject(xhttp.statusText);
			};

			xhttp.send();
		});
	}

	// passing the url to the function
	// the promise is returned before the data is retrieved
	var promise = get('data/tweets.json');
	// registering callbacks on success or failure
	// .then(), when the data is returned the callback-function will fire
	promise
		.then(function (tweets) {
			console.log(tweets);
			// returning a new promise when the callback was fired
			return get('data/friends.json');
		})
		.then(function (friends) {
			console.log(friends);
			return get('data/videos.json');
		})
		.then(function (videos) {
			console.log(videos);
		})
		.catch(function (error) {
			// .catch(), handle the error, the callback-function will fire when there is an error

			console.log(error);
		});
};
```

### JavaScript Generators

```js
window.onload = function () {
	// creating generator by putting * at the function
	function* gen() {
		var x = yield 10; // yield, pause the function process at the certain point

		console.log(x);
	}

	var myGen = gen(); // it doesn't fire the function it just prepares them, and will return an interval object

	console.log(myGen.next()); // .next(), use to start generating the code, will return an object with properties: value & done
	// (in this case it will read the first part of the code and return a value which is 10 and pause it when it reads the yield keyword)
	console.log(myGen.next(20)); // generate the next code and pass a value to the variable "x"
};

// outputting the value of formData
var data = formData.entries();
var obj = data.next();
var retrieved = {};
while (undefined !== obj.value) {
	retrieved[obj.value[0]] = obj.value[1];
	obj = data.next();
}
console.log('retrieved:', retrieved);
```

### Modern Async Methods

```js
// ***********************************************
// callback
// function inside another function
// higher order function is the main function that accepts another function as a parameter
function callbackHell() {
	setTimeout(() => {
		console.log(data);

		setTimeout(() => {
			console.log(data);
		}, 1000);
	}, 500);
}
```

```js
// ***********************************************
// fetch API
// an asynchronous api that returns a Promise
const fetchData = fetch('url');

const fetchData = fetch('https://jsonplaceholder.typicode.com/posts')
	// the api will always resolve even the url is not found
	// only way to reject is to throw an error

	.then((response) => {
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		return response.json(); // this will return a Promise object
	})
	.then((data) => {
		// get the data returned by the .json() Promise object
		console.log(data);
	})
	.catch((error) => {});
```

```js
// ***********************************************
// promise
// function that returns something after a period of time
const myPromise = new Promise((resolve, reject) => {
	// Asynchronous operation
	if (someOperation == true) {
		resolve('Success');
	} else {
		reject(new Error('Failed'));
	}
});

// assess the returned promise
myPromise
	.then((result) => {
		// handle the resolve promise with .then()
		console.log(result);
	})
	.catch((error) => {
		// handle the rejected promise with .catch()
		console.error(error);
	});

// chaining .then()
const myPromise2 = new Promise((resolve, reject) => {
	resolve({ user: 'John' });
});

myPromise2
	.then((data) => {
		return data;
	})
	.then((user) => {
		// receive the data that is returned by the first .then()
		console.log(user);
	})
	.catch();

// chaining promises
fetchData('todos/luigi.json')
	.then((data) => {
		console.log('promised 1 resolved: ', data);
		return fetchData('todos/mario.json');
	})
	.then((data) => {
		console.log('promised 2 resolved: ', data);
		return fetchData('todos/shaun.json');
	})
	.then((data) => {
		console.log('promised 3 resolved: ', data);
	})
	.catch((err) => {});

asyncOperation1()
	.then((result1) => asyncOperation2(result1))
	.then((result2) => asyncOperation3(result2))
	.then((finalResult) => console.log(finalResult))
	.catch((error) => console.error(error));

// promise request with Fetch API
function fetchData() {
	const promise = new Promise((resolve, reject) => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				return response.json();
			})
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});

	return promise;
}

// handling the promise function
fetchData()
	.then((posts) => {
		console.log('Fetched posts:', posts);
	})
	.catch((error) => {
		console.error('Error fetching data:', error);
	});

// handling multiple promises and excutes something after completion
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
	console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```

```js
// ***********************************************
// async/await
// simplified syntax for using Promises
// use 'async' prefix to declare an async function
// any function that declared 'async' will return a Promise object
async function fetchData() {
	// await
	// - await keyword can only be use inside an async function
	// - the function waits for the promise to resolve before moving to the next line.
	// - used to pause the execution of the async function until a promise is resolved
	// - .json() method also return a Promise object

	const data = await fetch('https://jsonplaceholder.typicode.com/todos');
	return data.json(); // this will return a Promise object because .json() method is a promise itself
	return await data.json(); // this will return the actual result data of the Promise object
}

async function fetchData() {
	const data = await fetch('https://jsonplaceholder.typicode.com/todos').then(
		(response) => {
			return response.json();
		}
	);

	console.log(data); // logging the result inside the async function will get the resolved data
	return data; // this will return a Promise object and not the resolved data
}

// simplified version
async function fetchData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	return response.json();
}

// defining async via arrow function
export const apiService = {
	fetchData: async (param) => {
		// Your async logic here
	},
};

apiService.fetchData(arg);

// 3 ways to retrieve the returned data from a promise object
// using await
const data = await fetchData();
console.log(data); // This will log the actual data

// using .then()
fetchData().then((data) => {
	console.log(data); // This will also log the actual data
});

// using .then() and await expression
const result = await fetchData().then((data) => {
	return data;
});

console.log(result); // This will also log the actual data

// error handling
async function fetchData() {
	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/todos');
		return data.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error; // Re-throw the error to propagate it
	}
}

// another way of error handling
async function fetchData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}

fetchData().then((data) => {
	console.log(data);
});

// omitting the await expression
// completes execution immediately and returns a promise that is already resolved without pausing
async function fetchData(id) {
	return Api.get(`https://jsonplaceholder.typicode.com/todos`);
}

fetchData(id)
	.then((res) => {
		if (res.data) {
		}
	})
	.catch((err) => {
		if (err.response.status == 401) {
		}
	});

// omitting the async declaration and using await in promise request
// this is a top-level await declaration
var data1 = await fetch('https://jsonplaceholder.typicode.com/todos');
console.log(await data1.json());

// chaining async/await operations
async function fetchUserData() {
	try {
		const userResponse = await fetch(
			`https://jsonplaceholder.typicode.com/todos`
		);
		const userData = await userResponse.json();
		// console.log('User data:', userData);

		const additionalDataResponse = await fetch(
			`https://jsonplaceholder.typicode.com/todos/1`
		);
		const additionalData = await additionalDataResponse.json();
		// console.log('Additional data:', additionalData);

		return { userData, additionalData };
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	}
}

async function fetchAndProcessUser() {
	try {
		const { userData, additionalData } = await fetchUserData();

		// console.log('Processing user data:', userData);
		// console.log('Processing additional data:', additionalData);

		return { userData, additionalData };
	} catch (error) {
		// console.error('Error fetching and processing user data:', error);
	}
}

const result1 = await fetchAndProcessUser();
// console.log(result1);

// clean setup of async/await and .then operation
const fetchData = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

	if (response.status !== 200) {
		throw new Error('Network response was not ok');
	}

	const data = await response.json();
	return data;
};

fetchData()
	.then((data) => console.log('resolved:', data))
	.catch((err) => console.log('rejected:', err));
```

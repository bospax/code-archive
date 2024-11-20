# Axios

### Initialization

```js
// cdn
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>;

// npm
$ npm install axios
```

### Making a Request

```js
// (.then syntax)
// get request
axios({
	method: 'get',
	url: 'https://jsonplaceholder.typicode.com/todos',
})
	.then((res) => console.log(res))
	.catch((err) => console.error(err));

// passing parameter method 1
axios({
	method: 'get',
	url: 'https://jsonplaceholder.typicode.com/todos',
	params: {
		_limit: 5,
	},
})
	.then((res) => console.log(res))
	.catch((err) => console.error(err));

// passing parameter method 2
axios
	.get('https://jsonplaceholder.typicode.com/todos', {
		params: { _limit: 5 },
	})
	.then((res) => console.log(res))
	.catch((err) => console.error(err));

// passing parameter method 3
axios
	.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
	.then((res) => console.log(res))
	.catch((err) => console.error(err));
```

```js
// post request
axios({
	method: 'post',
	url: 'https://jsonplaceholder.typicode.com/todos',
	data: {
		title: 'New Todo',
		completed: false,
	},
})
	.then((res) => {})
	.catch((err) => {});
```

```js
// put request
// update the entire model including the id
axios({
	method: 'put',
	url: 'https://jsonplaceholder.typicode.com/todos/1',
	data: {
		title: 'Update Todo',
		completed: true,
	},
})
	.then((res) => {})
	.catch((err) => {});
```

```js
// patch request
// update only a part of the model
axios({
	method: 'patch',
	url: 'https://jsonplaceholder.typicode.com/todos/1',
	data: {
		title: 'Update Todo',
		completed: true,
	},
})
	.then((res) => {})
	.catch((err) => {});
```

```js
// delete request
axios({
	method: 'delete',
	url: 'https://jsonplaceholder.typicode.com/todos/1',
})
	.then((res) => {})
	.catch((err) => {});
```

```js
// simultaneous request
// multiple request at the same time
// axios can take an array of requests
axios
	.all([
		axios.get('https://jsonplaceholder.typicode.com/todos'),
		axios.get('https://jsonplaceholder.typicode.com/posts'),
	])
	.then((res) => {
		console.log(res[0]);
		console.log(res[1]);
	})
	.catch((err) => {});
```

```js
// another method of accessing the response using spread() method
axios
	.all([
		axios.get('https://jsonplaceholder.typicode.com/todos'),
		axios.get('https://jsonplaceholder.typicode.com/posts'),
	])
	.then(
		axios.spread((todos, posts) => {
			// do something here
		})
	)
	.catch((err) => {});
```

```js
// sample crud using axios methods
// get request
axios
	.get('/api/users')
	.then((response) => {
		console.log('Users:', response.data);
		// Handle the fetched users here (e.g., display them in a list)
	})
	.catch((error) => {
		console.error('Error fetching users:', error);
	});

// post request
const newUser = {
	name: 'John Doe',
	email: 'johndoe@example.com',
	age: 30,
};

axios
	.post('/api/users', newUser)
	.then((response) => {
		console.log('User created:', response.data);
		// Handle the newly created user (e.g., add them to the displayed list)
	})
	.catch((error) => {
		console.error('Error creating user:', error);
	});

// update request
const updatedUser = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	age: 31,
};

const userId = 1; // The ID of the user you want to update

axios
	.put(`/api/users/${userId}`, updatedUser)
	.then((response) => {
		console.log('User updated:', response.data);
		// Handle the updated user (e.g., update their details in the list)
	})
	.catch((error) => {
		console.error('Error updating user:', error);
	});

// delete request
const userIdToDelete = 1; // The ID of the user you want to delete

axios
	.delete(`/api/users/${userIdToDelete}`)
	.then((response) => {
		console.log('User deleted:', response.data);
		// Handle the user deletion (e.g., remove the user from the displayed list)
	})
	.catch((error) => {
		console.error('Error deleting user:', error);
	});
```

```js
// interceptors
// triggers everytime you make a request
// check request configuration
axios.interceptors.request.use(
	(config) => {
		console.log(`${config.method} request sent to ${config.url}`);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
```

```js
// headers / custom headers
// useful in sending data into the headers such as authentication, login or tokens
const config = {
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'some token',
	},
};

axios
	.post(
		'https://jsonplaceholder.typicode.com/todos',
		{
			title: 'New Todo',
			completed: false,
		},
		config
	)
	.then((res) => {})
	.catch((err) => {});
```

```js
// axios globals
// declaring global options and configuration
axios.defaults.headers.common['X-Auth-Token'] = 'sometoken';

// error handling
axios
	.post(
		'https://jsonplaceholder.typicode.com/todos',
		{
			title: 'New Todo',
			completed: false,
		},
		config
	)
	.then((res) => {})
	.catch((err) => {
		console.log(err.response);
		console.log(err.response.data);
		console.log(err.response.status);
		console.log(err.response.headers);
		console.log(err.request); // request was made but no response
		console.log(err.message); // error message
	});
```

```js
// cancel token
// cancelling a request
const source = axios.CancelToken.source();

axios
	.get('response.php', {
		cancelToken: source.token,
	})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		if (axios.isCancel(err)) {
			console.log('request cancelled');
		}
	});

// cancel the request using cancel() method
source.cancel();
```

```js
// axios instance
const axiosInstance = axios.create({
	// custom settings
	baseURL: 'https://jsonplaceholder.typicode.com',
});

axiosInstance.get('/todos').then((res) => {});
```

### Examples / Snippets

```js
// *** start of snippet: creating axios request in laravel application ***
document.querySelector('#post-form').addEventListener('submit', function (e) {
	e.preventDefault();

	// this.action - this is the form action
	axios
		.post(this.action, {
			title: document.querySelector('#title').value,
			body: document.querySelector('#body').value,
		})
		.then((response) => {
			console.log('success');
			console.log(response);
		})
		.catch((error) => {
			const errors = error.response.data.errors; // get the errors
			const firstItem = Object.keys(errors)[0]; // get the first key
			const firstItemDOM = document.getElementById(firstItem); // get the dom element by id
			const firstErrorMessage = errors[firstItem][0]; // get the message

			// scroll to the dom element
			firstItemDOM.scrollIntoView();

			// remove all error messages
			const errorMessages = document.querySelectorAll('.error');
			errorMessages.forEach((element) => (element.textContent = ''));

			// adding element with the error message
			firstItemDOM.insertAdjacentHTML(
				'afterend',
				`<div class="error">${firstErrorMessage}</div>`
			);
		});
});
// *** end of snippet: creating axios request in laravel application ***

// =========================================
// 0004 - debugging
// =========================================
// issue: request by multipart form using FormData() object
// cannot be parsed by backend when using other method aside from POST
// fix:
const formData = new FormData();
formData.append('_method', 'PUT'); // append this in request
axios({
	method: 'post', // send with post method
	url: `api/positions/${vm.position.id}`,
	data: formData,
});
// source: https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
```

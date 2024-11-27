# Asynchronous JQuery

### Making a Request

```js
// using jquery method to make request
window.onload = function () {
	// $.get(), one method and does everything including initializing the request
	// parameters: url, callback-function
	// callback-function will fire after the data has been retrieved
	$.get('data/tweets.json', function (data) {
		// passing the retrieved data into the function parameter and then you can use it
		console.log(data);
	});
	console.log('test asynchronous'); // asynchronous test, this line of code should be executed without waiting for the request to be completed
};

// callback-function
// asynchronous way, start now and finish up later
window.onload = function () {
	/* the data request will be sent and proceed to the next line of code/instruction 
	and when it is completed the callback-function will fire and retrieve the data */
	$.get('data/tweets.json', function (data) {
		console.log(data);
	});
	console.log('test asynchronous'); // next line of code
};
```

### Promises

```js
// jquery promises
window.onload = function () {
	// the .get() will return the promise interface so you can use the .then() method
	$.get('data/tweets.json')
		.then(function (tweets) {
			console.log(tweets);
			return $.get('data/friends.json');
		})
		.then(function (friends) {
			console.log(friends);
			return $.get('data/videos.json');
		})
		.then(function (videos) {
			console.log(videos);
		});
};
```

### Generators

```js
// javascript generators
window.onload = function () {
	function genWrap(generator) {
		var gen = generator(); // prepare the generator
		function handle(yielded) {
			// passing the yielded object(in this case the request promise) to the function from the generator
			if (!yielded.done) {
				// when the done property is equal to false(not done yet)
				yielded.value.then(function (data) {
					// passing and retrieving the data from the promise
					return handle(gen.next(data)); // returning back the handle and passsing the data(retrieve from the promise) and assigning the value to the variable
				});
			}
		}
		return handle(gen.next()); // calling the handle() function and passing an argument (starting the generator with .next method)
	}
	// passing the generator as an argument to the genWrap() function
	genWrap(function* () {
		var tweets = yield $.get('data/tweets.json'); // the function handle() will continue to fire until the generator is done
		console.log(tweets);
		var friends = yield $.get('data/friends.json');
		console.log(friends);
		var videos = yield $.get('data/videos.json');
		console.log(videos);
	});
};
```

### Callbacks

```js
// nested callbacks
// callback hell
window.onload = function () {
	// making request using the method .ajax()
	// passing object in the .ajax() method
	$.ajax({
		type: 'GET', // type of request
		url: 'data/tweets.json', // url, the location of the data
		success: function (data) {
			// code to execute when the request was success/completed and returned
			// in this case we pass a callback-function and retrieve the returned data to the console
			console.log(data);
			// after successfully got the request and completed we execute another ajax request()
			// callback after callback after callback
			$.ajax({
				type: 'GET',
				url: 'data/friends.json',
				success: function (data) {
					console.log(data);
					// after successfully got the request and completed we execute another ajax request()
					$.ajax({
						type: 'GET',
						url: 'data/videos.json',
						success: function (data) {
							console.log(data);
						},
						error: function (jqXHR, textStatus, error) {
							console.log(error);
						},
					});
				},
				error: function (jqXHR, textStatus, error) {
					console.log(error);
				},
			});
		},
		error: function (jqXHR, textStatus, error) {
			// code to execute when there is an error in the request
			// in this case we call a function with parameters: jqXHR Object, textStatus of the error, the error itself
			console.log(error); // not a proper way of handling error, but this is just an example
		},
	});
};
```

```js
// structuring callbacks
// proper way of structuring multiple/nested callbacks
window.onload = function () {
	// separating the error, by making function
	function handleError(jqXHR, textStatus, error) {
		console.log(error);
	}
	// making the first ajax request
	$.ajax({
		type: 'GET',
		url: 'data/tweets.json',
		success: cbTweets, // calling the callback function on success
		error: handleError,
	});
	// separating callback function, and sending another ajax request
	function cbTweets(data) {
		console.log(data);
		$.ajax({
			type: 'GET',
			url: 'data/friends.json',
			success: cbVideos,
			error: handleError,
		});
	}

	function cbVideos(data) {
		console.log(data);
		$.ajax({
			type: 'GET',
			url: 'data/videos.json',
			success: function (data) {
				console.log(data);
			},
			error: handleError, // calling the error handler function
		});
	}
};
```

### Snippets

```js
// the famous jquery ajax call
var data = { id: id };

$.ajax({
	url: '../wp-content/themes/jvr/program-modal.php',
	method: 'post',
	data: data,
	success: function (data) {
		alert(data);
	},
	error: function () {
		alert('Something went wrong!');
	},
});
```

```js
// check if a new data is inserted into the database
setInterval(() => {
	count_data();
}, 1000);

var old_count = 0;

function count_data() {
	var type = 'count_data';

	$.ajax({
		url: 'routes/router.php',
		type: 'POST',
		data: { type: type },

		success: function (response) {
			if (response != old_count) {
				loadData();
				old_count = response;
			}
		},
	});
}
```

```js
// sample ajax crud and file import
// import file into database
$('#btn-import-driver').click(function () {
	var file_data = $('#input-import-driver').prop('files')[0];
	var form_data = new FormData();

	form_data.append('file', file_data);

	// alert(form_data);

	$.ajax({
		url: '../web/drivers/ajax/import_driver.php', // point to server-side PHP script
		dataType: 'text', // what to expect back from the PHP script, if anything
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function (response) {
			var response = JSON.parse(response);

			if (response['type'] == 'success') {
				Swal.fire({
					icon: 'success',
					text: response['msg'],
				}).then(function () {
					window.location.reload();
				});
			} else {
				Swal.fire({
					icon: 'error',
					text: response['msg'],
				});
			}
		},
	});
});
```

```js
// adding data to database
$(document).on('click', '#btn-add-driver', function (e) {
	e.preventDefault();

	var type = $(this).data('type');
	var dname = $('#input-driver-name').val();
	var dnum = $('#input-driver-number').val();
	var id = $('#input-driver-id').val();

	$.ajax({
		url: '../web/drivers/ajax/router.php', // point to server-side PHP script
		data: {
			type: type,
			dname: dname,
			dnum: dnum,
			id: id,
		},
		type: 'post',
		success: function (response) {
			var response = JSON.parse(response);

			if (response['type'] == 'success') {
				Swal.fire({
					icon: 'success',
					text: response['msg'],
				}).then(function () {
					window.location.reload();
				});
			} else {
				var errors = response['msg'].toString();

				Swal.fire({
					icon: 'error',
					text: errors,
				});
			}
		},
	});

	return false;
});
```

```js
// transfer data from one input to another input
$(document).on('click', '#btn-edit-driver', function (e) {
	e.preventDefault();

	var id = $(this).data('id');
	var dname = $(this).parent().siblings('.dname').text();
	var dnum = $(this).parent().siblings('.dnum').text();

	$('#input-driver-id').val(id);
	$('#input-driver-name').val(dname);
	$('#input-driver-number').val(dnum);
	$('#btn-add-driver').attr('data-type', 'edit');
	$('.card-title-driver').text('Update Driver');

	return false;
});
```

```js
// clear all fields
$(document).on('click', '#btn-clear-driver', function (e) {
	e.preventDefault();

	$('#input-driver-name').val('');
	$('#input-driver-number').val('');
	$('#btn-add-driver').attr('data-type', 'add');
	$('.card-title-driver').text('Add New Driver');

	return false;
});
```

```js
// delete data
$(document).on('click', '#btn-del-driver', function (e) {
	e.preventDefault();

	var id = $(this).data('id');
	var type = 'delete';
	var dname = $('#input-driver-name').val();
	var dnum = $('#input-driver-number').val();

	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '../web/drivers/ajax/router.php', // point to server-side PHP script
				data: {
					type: type,
					dname: dname,
					dnum: dnum,
					id: id,
				},
				type: 'post',
				success: function (response) {
					var response = JSON.parse(response);

					if (response['type'] == 'success') {
						Swal.fire({
							icon: 'success',
							text: response['msg'],
						}).then(function () {
							window.location.reload();
						});
					} else {
						var errors = response['msg'].toString();

						Swal.fire({
							icon: 'error',
							text: errors,
						});
					}
				},
			});
		}
	});

	return false;
});
```

```js
$('#FormUser').submit(function (event) {
	event.preventDefault();

	var form = $(this);

	$.ajax({
		url: 'postAccount.php',
		type: 'post',
		contentType: 'application/x-www-form-urlencoded',
		datatype: 'json/html',
		data: form.serialize(),
		success: function (data, textStatus, jQxhr) {
			$('#Alert').show();
			console.log(data);
		},
		error: function (jqXhr, textStatus, errorThrown) {
			console.log(errorThrown);
		},
	});
});
```

# Fetch API

## Fetch API CRUD Snippets

```js
const addJobs = async (newJob) => {
	const res = await fetch('/api/jobs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newJob),
	});
	return;
};
```

```js
const deleteJobs = async (id) => {
	const res = await fetch(`/api/jobs/${id}`, {
		method: 'DELETE',
	});
	return;
};
```

```js
const fetchJobs = async () => {
	const apiUrl = '/api/jobs';
	try {
		const res = await fetch(apiUrl);
		const data = await res.json();
	} catch (error) {
		console.log('Error fetching data', error);
	} finally {
		setLoading(false);
	}
};
```

```js
const updateJobs = async (job) => {
	const res = await fetch(`/api/jobs/${job.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(job),
	});
	return;
};
```

# React Router

`npm install react-router-dom`

### Components & Concepts

```jsx
// setup and boilerplates
// method 1: jsx based pattern
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/add-job"
					element={<AddJobPage addJobSubmit={addJob} />}
				/>
				<Route
					path="/edit-job/:id"
					element={<EditJobPage updateJobSubmit={updateJob} />}
					loader={jobLoader}
				/>
				<Route
					path="/jobs/:id"
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
```

```jsx
// method 2: object based pattern
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "jobs",
				element: <JobsPage />,
			},
			{
				path: "add-job",
				element: <AddJobPage addJobSubmit={addJob} />,
			},
			{
				path: "edit-job/:id",
				element: <EditJobPage updateJobSubmit={updateJob} />,
				loader: jobLoader,
			},
			{
				path: "jobs/:id",
				element: <JobPage deleteJob={deleteJob} />,
				loader: jobLoader,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
```

```jsx
// outlet component - use to display the content of the child component
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};
```

```jsx
// simple link for navigation
<Link to="/about">About</Link>;

// navlink component - a special component for creating app navigation menu
// NavLink is an extension of Link that provides additional functionality
const linkClass = ({ isActive }) => (isActive ? 'bg-black' : 'text-white');

<NavLink to="/" className={linkClass}>
	Home
</NavLink>;

// redirect the app into specific route
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const submitForm = (e) => {
	e.preventDefault();
	return navigate('/jobs');
};

// getting the param value from the route
import { useParams } from 'react-router-dom';
const { id } = useParams();

// using the loader and getting the data passed from the router
// the loader prop is used to load data before rendering a route component
// first create the loader function to fetch the data
const jobLoader = async ({ params }) => {
	const res = await fetch(`/api/jobs/${params.id}`);
	const data = await res.json();
	return data;
};
export { jobLoader };

// inside the component that uses the loaded data
// setup the route using loader prop
import { jobLoader } from './pages/Loaders';
<Route path="/jobs/:id" element={<JobPage />} loader={jobLoader} />;

// access the data from the loader function using the useLoaderData hook
const job = useLoaderData();
const [title, setTitle] = useState(job.title);
const [type, setType] = useState(job.type);
```

### Practical Use Cases

```jsx
// working with forms
// complete CRUD setup
// code in App.jsx
const App = () => {
	// Add New Job
	const addJob = async (newJob) => {
		const res = await fetch('/api/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	// Delete Job
	const deleteJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: 'DELETE',
		});
		return;
	};

	// Update Job
	const updateJob = async (job) => {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(job),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/add-job"
					element={<AddJobPage addJobSubmit={addJob} />}
				/>
				<Route
					path="/edit-job/:id"
					element={<EditJobPage updateJobSubmit={updateJob} />}
					loader={jobLoader}
				/>
				<Route
					path="/jobs/:id"
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};
```

```jsx
// page for viewing of data
// together with delete function
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';

const JobPage = ({ deleteJob }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const job = useLoaderData();

	const onDeleteClick = (jobId) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this listing?'
		);

		if (!confirm) return;

		deleteJob(jobId);

		toast.success('Job deleted successfully');

		navigate('/jobs');
	};

	return (
		<>
			<div>
				<Link to="/jobs">
					<FaArrowLeft className="mr-2" /> Back to Job Listings
				</Link>
			</div>

			<div>{job.type}</div>
			<h1>{job.title}</h1>
			<div>
				<FaMapMarker className="text-orange-700 mr-1" />
				<p className="text-orange-700">{job.location}</p>
			</div>

			<div>
				<Link to={`/edit-job/${job.id}`}>Edit Job</Link>
				<button onClick={() => onDeleteClick(job.id)}>
					Delete Job
				</button>
			</div>
		</>
	);
};
```

```jsx
// creating a loader to fetch data before component renders
const jobLoader = async ({ params }) => {
	const res = await fetch(`/api/jobs/${params.id}`);
	const data = await res.json();

	return data;
};

export { JobPage as default, jobLoader };
```

```jsx
// create an add component page
const AddJobPage = ({ addJobSubmit }) => {
	const [title, setTitle] = useState('');
	const [type, setType] = useState('Full-Time');

	const navigate = useNavigate();

	const submitForm = (e) => {
		e.preventDefault();

		const newJob = {
			title,
			type,
		};

		addJobSubmit(newJob);

		toast.success('Job Added Successfully');

		return navigate('/jobs');
	};

	return (
		<form onSubmit={submitForm}>
			<div className="mb-4">
				<label htmlFor="type">Job Type</label>
				<select
					id="type"
					name="type"
					className="border rounded w-full py-2 px-3"
					required
					value={type}
					onChange={(e) => setType(e.target.value)}
				>
					<option value="Full-Time">Full-Time</option>
					<option value="Part-Time">Part-Time</option>
				</select>
			</div>

			<div className="mb-4">
				<label>Job Listing Name</label>
				<input
					type="text"
					id="title"
					name="title"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="eg. Beautiful Apartment In Miami"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<button type="submit">Add Job</button>
		</form>
	);
};
```

```jsx
// create an edit component page
const EditJobPage = ({ updateJobSubmit }) => {
	const job = useLoaderData();
	const [title, setTitle] = useState(job.title);
	const [type, setType] = useState(job.type);

	const navigate = useNavigate();
	const { id } = useParams();

	const submitForm = (e) => {
		e.preventDefault();

		const updatedJob = {
			id,
			title,
		};

		updateJobSubmit(updatedJob);

		toast.success('Job Updated Successfully');

		return navigate(`/jobs/${id}`);
	};

	return (
		<form onSubmit={submitForm}>
			// input elements here
			<div>
				<button type="submit">Update Job</button>
			</div>
		</form>
	);
};
```

```jsx
// lazy loading a route / components with react suspense
// useful for large applications where not all components or routes need to be loaded upfront
// also useful incase a component has a problem or error it will not affect the whole application and other components
// loading only the necessary components and deferring the loading of others until they're needed
// method 1:
import React, { lazy, Suspense } from 'react';

// use react lazy function to import components dynamically.
// wrap the routes or components with Suspense to display a fallback UI while the component is being loaded
const MainLayout = lazy(() => import('./components/MainLayout'));
const HomePage = lazy(() => import('./components/HomePage'));
const JobsPage = lazy(() => import('./components/JobsPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={
				<Suspense fallback={<div>Loading...</div>}>
					<MainLayout />
				</Suspense>
			}
		>
			<Route
				index
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<HomePage />
					</Suspense>
				}
			/>
			<Route
				path="/jobs"
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<JobsPage />
					</Suspense>
				}
			/>
			<Route
				path="*"
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<NotFoundPage />
					</Suspense>
				}
			/>
		</Route>
	)
);
```

```jsx
// method 2:
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/profiles',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<ProfilesPage />
			</Suspense>
		),
		children: [
			{
				path: '/profiles/:id',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<ProfilePage />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/jobs',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<JobsPage />
			</Suspense>
		),
	},
]);
```

```jsx
// creating a protected routes component
// code in ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
	const user = useAuth(); // custom hook for authentication
	const navigate = useNavigate();

	useEffect(() => {
		if (user === null) {
			navigate('/signin', { replace: true });
		}
	}, [navigate, user]);

	return children;
}

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<HomePage />
			</ProtectedRoute>
		),
	},
]);
```

```jsx
// handling error
// creating an error page component
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
	const error = useRouteError();

	return (
		<div>
			<h1>Oops! Something went wrong.</h1>
			<p>{error.statusText || error.message}</p>
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [],
	},
]);
```

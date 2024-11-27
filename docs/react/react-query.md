# React Query

### Fundamental Concepts

```jsx
// basic setup and usage
npm install @tanstack/react-query

// wrap your application in the QueryClientProvider and initialize a QueryClient to manage queries globally
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Main() {
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
}

// Fetching Data with useQuery
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function FetchUsers() {
	// data: Contains the fetched data if successful
	// isLoading and error: Status flags that handle loading and error states
	// isLoading is only true the very first time the query runs and there is no cached data.
	// isFetching becomes true on any fetch attempt, whether it’s the first load or a later refetch.
	const { data, isLoading, isFetching, error } = useQuery(
		['users'], // Query key, a unique identifier to cache and track data
		async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/users');
			return response.data;
		}
	);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading users</p>;

	return <div></div>;
}

// refetchOnWindowFocus: false: Disables automatic refetching when the window regains focus.
useQuery(
	['users'],
	fetchUsers,
	{ refetchOnWindowFocus: false }
);

// Error Handling and Retry Logic
// React Query automatically retries failed queries
useQuery(
	['users'],
	fetchUsers,
	{ retry: 2, retryDelay: 1000 } // Retry twice, with 1s delay between retries
);

// Query Pagination
// { keepPreviousData: true } // Keeps previous page data while fetching new
import { useQuery } from '@tanstack/react-query';

function PaginatedUsers() {
	const [page, setPage] = useState(1);

	const { data, isLoading, isFetching } = useQuery(
		['users', page],
		() => fetchUsers(page),
		{ keepPreviousData: true } // Keeps previous page data while fetching new
	);

	return (
		<div>
			{isLoading ? <p>Loading...</p> : <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>}
			// Math.max(old - 1, 1) ensures the page number doesn’t go below 1
			<button onClick={() => setPage(old => Math.max(old - 1, 1))}>Previous</button>
			<button onClick={() => setPage(old => old + 1)} disabled={isFetching}>Next</button>
		</div>
	);
}

// Temporary update (client-side) to remove a user without waiting for the server
// make changes even before the server response.
function DeleteUser({ userId }) {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		() => axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`),
		{
			onMutate: async () => {
				const previousUsers = queryClient.getQueryData(['users']);
				// set data in the users key client side before server response
				queryClient.setQueryData(['users'], old => old.filter(user => user.id !== userId));
				return { previousUsers };
			},
			onError: (error, _, context) => {
				queryClient.setQueryData(['users'], context.previousUsers); // Rollback on error
			},
			onSettled: () => {
				queryClient.invalidateQueries(['users']); // Refetch users on completion
			},
		}
	);

	return (
		<button onClick={() => mutation.mutate()}>Delete User</button>
	);
}
```

### Query & Mutating Data

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Schema } from '../types/schema';
import { mapData } from '../utils/mapData';

export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Schema) => {
			await axios.post(
				'http://localhost:8080/users',
				// omit() function, imported from lodash, creates a copy of an object with specified keys removed
				// the data sent in the POST request only includes fields required by the server and excludes any omitted field
				omit(mapData(data), 'variant')
			);
		},

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			alert('User created!');
		},
	});
}

export function useEditUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: Schema) => {
			if (data.variant === 'edit') {
				await axios.put(
					`http://localhost:8080/users/${data.id}`,
					omit(mapData(data), 'variant')
				);
				alert('User edited successfully!');
			}
		},

		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });

			if (variables.variant === 'edit') {
				await queryClient.invalidateQueries({
					queryKey: ['user', { id: variables.id }],
				});
			}
		},
	});
}
// services/queries.ts
import { useQuery } from '@tanstack/react-query';
import { Option } from '../../types/option';
import { ApiGet } from '../types/apiTypes';
import { Schema } from '../types/schema';

export function useSkills() {
	return useQuery({
		queryKey: ['skills'],
		queryFn: () =>
			axios
				// get<Option[]> ensures TypeScript knows the API response will be an array of Option objects
				.get<Option[]>('http://localhost:8080/skills')
				.then((res) => res.data),
	});
}

export function useUsers() {
	return useQuery({
		queryKey: ['users'],
		// function returns a Promise<Option[]> by mapping the array of ApiGet users to Option objects, using id and name properties
		queryFn: (): Promise<Option[]> =>
			axios
				// ApiGet[]: Specifies that the API response will be an array of ApiGet objects
				.get<ApiGet[]>('http://localhost:8080/users')
				.then((response) =>
					response.data.map((user) => ({
						id: user.id.toString(),
						label: user.name,
					}))
				),
	});
}

export function useUser(id: string) {
	return useQuery({
		queryKey: ['user', { id }],
		// Schema: This return type assumed to be a structured user schema
		// allows mapping data from the API into a format consistent with the application's internal data structure
		queryFn: async (): Promise<Schema> => {
			const { data } = await axios.get<ApiGet>(
				`http://localhost:8080/users/${id}`
			);

			return {
				variant: 'edit',
				id: data.id.toString(),
				name: data.name,
				email: data.email,
				formerEmploymentPeriod: [
					new Date(data.formerEmploymentPeriod[0]),
					new Date(data.formerEmploymentPeriod[1]),
				],
				gender: data.gender,
				languagesSpoken: data.languagesSpoken,
				registrationDateAndTime: new Date(data.registrationDateAndTime),
				salaryRange: [data.salaryRange[0], data.salaryRange[1]],
				skills: data.skills,
				states: data.states,
				students: data.students,
				isTeacher: data.isTeacher,
			};
		},
		enabled: !!id,
	});
}

// usage on component
export function Users() {
	const skillsQuery = useSkills();
	const usersQuery = useUsers();
	const userQuery = useUser(id);
	const createUserMutation = useCreateUser();
	const editUserMutation = useEditUser();

	// SubmitHandler - Type for handleSubmit function in react-hook-form, defining what data type is passed to the submit function
	// handleSubmit - ensures the form values are validated before running the submit handler
	const onSubmit: SubmitHandler<Schema> = (data) => {
		if (variant === 'create') {
			createUserMutation.mutate(data);
		} else {
			editUserMutation.mutate(data);
		}
	};

	return <div></div>;
}
```

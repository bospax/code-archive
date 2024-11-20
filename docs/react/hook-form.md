# React Hook Form

### Fundamental Concepts

```jsx
// setting up and basic usage
npm install react-hook-form

// useForm(): This hook returns several helper functions for form handling
// register(): Connects input fields to the form state.
// handleSubmit(): Processes the form on submission. It validates the form and then calls the onSubmit function with the form data
import { useForm } from 'react-hook-form';

const LoginForm = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("email")} />
			<input {...register("password")} type="password" />
			<button type="submit">Login</button>
		</form>
	);
};

// register("email")
// returns an object containing various properties and methods needed to connect this input to the form’s state
const emailProps = register("email");

<input
	name={emailProps.name}
	ref={emailProps.ref}
	onChange={emailProps.onChange}
	onBlur={emailProps.onBlur}
/>

// Managing Default Values
// RHF allows setting default values for fields, especially useful for edit forms
const { register, handleSubmit } = useForm({
	defaultValues: {
		email: 'test@example.com',
		password: '',
	},
});

// Using Watch to Track Field Changes
// watch enables us to monitor changes in real-time to a specific field or all fields
const { register, handleSubmit, watch } = useForm();

// watch all fields
const fields = watch();

// watch specific field
const password = watch("password");

return (
	<div>
		<input {...register("password")} type="password" />
		<p>Password: {password}</p>
	</div>
);

const { register, handleSubmit, watch } = useForm();
const showDetails = watch("showDetails", false);

return (
	<form onSubmit={handleSubmit(onSubmit)}>
		<label>Show Details?</label>
		<input type="checkbox" {...register("showDetails")} />
		{showDetails && (
			<>
				<label>Details:</label>
				<input {...register("details")} />
			</>
		)}
		<button type="submit">Submit</button>
	</form>
);

```

### Validation & Error Handling

```jsx
// custom component to handle error message
// errors.fieldName?.message: Shows an error message if validation fails.
const ErrorMessage = ({ error }) => (error ? <p>{error.message}</p> : null);

const LoginForm = () => {
	// { formState: { errors } } means you’re extracting errors directly from the formState object
	// errors: An object from formState containing validation errors for each field.
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// creating the validation rules
	// required, minLength: Built-in validation rules. The register function accepts validation rules as a second argument.
	const emailValidation = { required: 'Email is required' };
	const passwordValidation = {
		required: 'Password is required',
		minLength: {
			value: 6,
			message: 'Password must be at least 6 characters',
		},
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Email:</label>
			<input {...register('email', emailValidation)} />
			<ErrorMessage error={errors.email} />

			<label>Password:</label>
			<input {...register('password', passwordValidation)} />
			<ErrorMessage error={errors.password} />

			<button type="submit">Login</button>
		</form>
	);
};

// Custom Validation Functions
// validation functions are ideal for handling complex, field-specific rules
const emailValidation = {
	required: 'Email is required',
	validate: (value) =>
		value.endsWith('@company.com') || 'Email must be a company domain',
};

<input {...register('email', emailValidation)} />;

// Multiple Validation Rules with validate
// apply multiple custom validation rules by defining validate as an object rather than a single function
const emailValidation = {
	required: 'Email is required',
	validate: {
		// each key in the object (isCompanyEmail and minLength) represents a unique validation rule
		isCompanyEmail: (value) =>
			value.endsWith('@company.com') || 'Email must be a company domain',
		minLength: (value) =>
			value.length >= 10 || 'Email must be at least 10 characters long',
		// add more rules as needed
	},
};

<input {...register('email', emailValidation)} />;

// using setError
// setError: Sets a custom error if the username is already taken, showing an error message below the input
const checkUsernameAvailability = async (username) => {
	// simulate an api call from the server
	const availableUsernames = ['johnDoe', 'janeDoe'];
	return !availableUsernames.includes(username);
};

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const onSubmit = async (data) => {
		const isAvailable = await checkUsernameAvailability(data.username);
		if (!isAvailable) {
			setError('username', {
				type: 'manual',
				message: 'Username is already taken',
			});
			return;
		}
		console.log('Registration successful', data);
	};

	return <form onSubmit={handleSubmit(onSubmit)}></form>;
};
```

### Hook Form with Zod

```jsx
// installation
npm install zod @hookform/resolvers

// zodResolver: Maps Zod schema validation to RHF's form system.
// Schema validation: Zod schema defines rules for each field, providing a centralized and reusable way to manage validation
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		// link schema to React Hook Form using the zodResolver
		resolver: zodResolver(schema)
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Email:</label>
			<input {...register("email")} />
			{errors.email && <p>{errors.email.message}</p>}

			<label>Password:</label>
			<input {...register("password")} type="password" />
			{errors.password && <p>{errors.password.message}</p>}

			<button type="submit">Login</button>
		</form>
	);
};

// defining multiple validation rule in the schema
const schema = z.object({
	email: z.string().email("Invalid email format").nonempty("Email is required"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.nonempty("Password is required")
});

// Use Cases for Reusable Zod Schemas
const addressSchema = z.object({
	street: z.string().min(1, "Street is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z.string().regex(/^\d{5}$/, "Invalid postal code")
});

const billingSchema = z.object({ billingAddress: addressSchema });
const shippingSchema = z.object({ shippingAddress: addressSchema });

// schema can also be extended to use other validation
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = loginSchema.extend({
  	confirmPassword: z.string().min(6, "Password must be at least 6 characters")
});

```

### Types of Hook Form

```tsx
// define validation schema and extract types to define UserSchema types
// src/validation/userSchema.ts
import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	age: z.number().int().positive().max(120, 'Please enter a valid age'),
	bio: z.string().max(300, 'Bio must be 300 characters or less').optional(),
});

// zod.infer ensure that form fields are strictly typed, giving you compile-time type-checking and autocomplete
export type UserSchema = z.infer<typeof userSchema>;

// Set up the API slice to handle fetching and updating user data
// src/services/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserSchema } from '../validation/userSchema';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getUser: builder.query<UserSchema, void>({
			query: () => 'user/profile',
		}),
		updateUser: builder.mutation<UserSchema, Partial<UserSchema>>({
			query: (data) => ({
				url: 'user/profile',
				method: 'PUT',
				body: data,
			}),
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;

// Set Up the User Profile Form Component
// This component integrates React Hook Form with Zod and RTK Query to display, validate, and submit user profile data
// src/components/UserProfileForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userSchema, UserSchema } from '../validation/userSchema';
import { useGetUserQuery, useUpdateUserMutation } from '../services/userApi';

const UserProfileForm: React.FC = () => {
	const { data: user, isLoading } = useGetUserQuery();
	const [updateUser, { isLoading: isUpdating, isError, error }] = useUpdateUserMutation();

	// Initialize React Hook Form with Zod schema
	const { register, handleSubmit, formState: { errors }, reset } = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
	});

	// Populate form with fetched user data
	// reset function is a utility provided by React Hook Form that allows you to set or reset form values
	// reset with arguments - pre-fills and updates the form fields with the values provided
	// reset() without arguments - clears the form data back to default value
	useEffect(() => {
		if (user) {
			reset(user);
		}
	}, [user, reset]);

	const onSubmit = async (data: UserSchema) => {
		try {
			await updateUser(data).unwrap();
			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Failed to update profile', error);
		}
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Name</label>
				<input {...register("name")} />
				{errors.name && <p>{errors.name.message}</p>}
			</div>

			<div>
				<label>Email</label>
				<input type="email" {...register("email")} />
				{errors.email && <p>{errors.email.message}</p>}
			</div>

			<div>
				<label>Age</label>
				// By default, HTML form inputs capture all data as strings, even for fields with type="number"
				// { valueAsNumber: true } tells React Hook Form to convert the input value to a number before it’s passed to the schema for validation
				// ensures that when age is read in the form data, it’s a number (30) rather than a string ("30")
				<input type="number" {...register("age", { valueAsNumber: true })} />
				{errors.age && <p>{errors.age.message}</p>}
			</div>

			<div>
				<label>Bio</label>
				<textarea {...register("bio")} />
				{errors.bio && <p>{errors.bio.message}</p>}
			</div>

			<button type="submit" disabled={isUpdating}>Update Profile</button>

			{isError && <p>Error updating profile: {JSON.stringify(error)}</p>}
		</form>
	);
};

export default UserProfileForm;
```

### Hook Form, Query & TypeScript

```tsx
// file & folder structure
src
├── components
│   ├── RHFAutocomplete.tsx
│   ├── RHFCheckbox.tsx
│   ├── RHFDateRangePicker.tsx
│   ├── RHFDateTimePicker.tsx
│   ├── RHFRadioGroup.tsx
│   ├── RHFSlider.tsx
│   ├── RHFSwitch.tsx
│   ├── RHFTextField.tsx
│   └── RHFToggleButtonGroup.tsx
├── types
│   └── option.ts
├── users
│   ├── components
│   │   ├── Users.tsx
│   │   └── UsersProvider.tsx
│   ├── services
│   │   ├── mutations.ts
│   │   └── queries.ts
│   └── types
│       ├── apiTypes.ts
│       └── schema.ts
├── utils
│   └── mapData.ts
├── App.tsx
├── constants.ts
└── main.tsx

// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

// App.tsx
import { UsersProvider } from './users/components/UsersProvider';

export function App() {
	return <UsersProvider />;
}

// UsersProvider.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, Schema, schema } from '../types/schema';
import { Users } from './Users';

export function UsersProvider() {
	// useForm - Main hook for initializing form methods like register, handleSubmit, and control
	// Sets up the form's initial configuration and provides form methods
	const methods = useForm<Schema>({
		mode: 'all', // mode: 'all' sets the validation mode to trigger on any change
		resolver: zodResolver(schema), // uses zodResolver to integrate Zod schema validation with react-hook-form
		defaultValues, // sets initial values for the form fields
	});

	// FormProvider - Provides form methods to any nested component, enabling a centralized form context accessible through useFormContext
	// Wraps around the main form component so that any deeply nested component can access form data
	return (
		<FormProvider {...methods}>
			<Users />
			<DevTool control={methods.control} />
		</FormProvider>
	);
}

// constants.tsx
export const patterns = {
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

// types/schema.ts
import { z } from 'zod';
import { patterns } from '../../constants';

// z.intersection() method combines two schemas (object, discrimanatedUnion)
// meaning an input must satisfy both schemas for the validation to pass
export const schema = z
	.intersection(
		// z.object() method defines an object schema where each key has its own validation rules.
		// Inside this object, each field’s type and constraints are specified
		z.object({
			name: z.string().min(1, { message: 'Required' }),
			email: z
				.string()
				.min(1, { message: 'Email is required' })
				// .refine() - adds a custom validation
				.refine((text) => patterns.email.test(text), {
					message: 'Email not valid',
				}),
			states: z.array(z.string()).min(1).max(2), // specifies that states is an array of strings
			languagesSpoken: z.array(z.string()),
			gender: z.string().min(1),
			skills: z.array(z.string()).max(2),
			registrationDateAndTime: z.date(),
			formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
			salaryRange: z.array(z.number()).max(2),
		}),

		// z.discriminatedUnion() method is used to define a union type where each variant can be differentiated by a unique field,
		// 'variant' is the unique field used to differentiate the types in this union
		z.discriminatedUnion('variant', [
			z.object({ variant: z.literal('create') }),
			z.object({ variant: z.literal('edit'), id: z.string().min(1) }),
		])
	)
	// .and() method combines this schema with an additional union schema.
	// The input must satisfy both the initial intersection and this additional union condition
	.and(
		z.union([ // z.union([...]) specifies that one of the following must be true
			z.object({ isTeacher: z.literal(false) }), // represents an object where isTeacher is exactly false
			z.object({
				isTeacher: z.literal(true),

				students: z.array(
					z.object({
						name: z.string().min(4),
					})
				),
			}),
		])
	);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
	variant: 'create',
	email: '',
	name: '',
	states: [],
	languagesSpoken: [],
	gender: '',
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
	isTeacher: false,
};

// types
// Option[]: The response type is specified as an array of Option objects. This means each skill returned will have an id and a label
export type Option = { id: string; label: string };

// apiTypes.ts
type Create = {
	variant: 'create';
};

type Edit = {
	variant: 'edit';
	id: string;
};

export type ApiCommon = {
	email: string;
	name: string;
	states: string[];
	gender: string;
	languagesSpoken: string[];
	skills: string[];
	registrationDateAndTime: string;
	formerEmploymentPeriod: [string, string];
	salaryRange: [number, number];
	isTeacher: boolean;
	students: {
		name: string;
	}[];
};

// ApiCreateEdit: Combines ApiCommon with either Create or Edit
export type ApiCreateEdit = ApiCommon & (Create | Edit);

// ApiGet: Combines Edit with ApiCommon, representing a user fetched from the API for the edit scenario (since it includes an id field)
export type ApiGet = Edit & ApiCommon;

// components/RHFAutocomplete.tsx
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Option } from '../types/option';

// Controller - Used to integrate external form components (like custom inputs or third-party components) with react-hook-form’s state management
// FieldValues - A type that represents the structure of form data in react-hook-form. It’s a generic type parameter for the shape of your form fields
// Path - Provides a type-safe way to specify a field name in TypeScript. Ensures that the field name provided is valid within the FieldValues type
// useFormContext - A hook to access form methods provided by FormProvider from deeply nested components

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: Option[];
	label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
	name,
	options,
	label,
}: Props<T>) {
	// When working with non-standard components (like a date picker), you typically need control
	// to register and handle their values with react-hook-form via the Controller component
	const { control } = useFormContext();

	return (
		<Controller
			{/* Controller is a wrapper from React Hook Form to integrate the custom Autocomplete component with form management
			control: Passed in to make this field managed by React Hook Form
			name: Specifies which field in the form data this component represents
			render: Inside the render function, field and fieldState are destructured
			value: The current value of this field in the form
			onChange: A function to update the form’s state when this field’s value changes
			ref: A reference to the underlying DOM element (used for handling focus and errors)
			error: The error state of this field, if there is a validation issue */}
			control={control}
			name={name}
			render={({
				field: { value, onChange, ref },
				fieldState: { error },
			}) => (
				<Autocomplete
					options={options || []}
					{/* value: Maps value (an array of selected IDs) to actual option objects to populate the selected values in the dropdown */}
					value={value.map((id: string) =>
						options?.find((item) => item.id === id)
					)}
					{/* getOptionLabel: Specifies the label to display for each option. It looks up the label for each option by finding its ID in options */}
					getOptionLabel={(option) =>
						options?.find((item) => item.id === option.id)?.label ?? ''
					}
					{/* isOptionEqualToValue: Ensures that the correct option is matched based on its id when determining selection */}
					isOptionEqualToValue={(option, newValue) =>
						option.id === newValue.id
					}
					{/* updates the form’s state with new selections */}
					{/* When the selection changes, this function is called with newValue, an array of selected items */}
					{/* Autocomplete component calls this onChange={} function whenever the selection changes
					_ (the event, which is ignored here)
					newValue (the new array of selected options) */}
					onChange={(_, newValue) => {
						{/* using the Controller’s onChange() function to update the form’s value with just the ids */}
						onChange(newValue.map((item) => item.id));
					}}
					disableCloseOnSelect
					multiple
					renderInput={(params) => (
						<TextField
							{...params}
							fullWidth
							inputRef={ref}
							error={!!error}
							helperText={error?.message}
							label={label}
						/>
					)}
					renderOption={(props, option, { selected }) => (
						<Box component="li" {...props}>
							<Checkbox
								checked={selected}
							/>
							{option.label}
						</Box>
					)}
				/>
			)}
		/>
	);
}
```

```tsx
// components/RHFTextField.tsx
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type Props<T extends FieldValues> = {
	name: Path<T>;
} & Pick<TextFieldProps, 'label'>;

export function RHFTextField<T extends FieldValues>({
	name,
	...props
}: Props<T>) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...props}
					error={!!error}
					helperText={error?.message}
				/>
			)}
		/>
	);
}
```

```tsx
// utils/mapData.ts
// mapData() function is responsible for transforming the input data (of type Schema) into a format that aligns with the expected API structure
import { ApiCommon, ApiCreateEdit } from '../types/apiTypes';
import { Schema } from '../types/schema';

export function mapData(data: Schema): ApiCreateEdit {
	const common: ApiCommon = {
		email: data.email,
		formerEmploymentPeriod: [
			data.formerEmploymentPeriod[0].toString(),
			data.formerEmploymentPeriod[1].toString(),
		],
		name: data.name,
		gender: data.gender,
		languagesSpoken: data.languagesSpoken,
		registrationDateAndTime: data.registrationDateAndTime.toString(),
		salaryRange: [data.salaryRange[0], data.salaryRange[1]],
		skills: data.skills,
		states: data.states,
		isTeacher: data.isTeacher,
		students: data.isTeacher === true ? data.students : [],
	};

	switch (data.variant) {
		case 'create': {
			return { ...common, variant: data.variant };
		}
		case 'edit': {
			return { ...common, id: data.id, variant: data.variant };
		}
	}
}
```

```tsx
// services/mutations.ts
import axios from 'axios';
import omit from 'lodash/omit';
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
import axios from 'axios';
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
```

```tsx
// components/Users.tsx
import {
	SubmitHandler,
	useFieldArray,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import { useCreateUser, useEditUser } from '../services/mutations';
import { defaultValues, Schema } from '../types/schema';

export function Users() {
	const statesQuery = useStates();
	const languagesQuery = useLanguages();
	const gendersQuery = useGenders();
	const skillsQuery = useSkills();
	const usersQuery = useUsers();

	// useFormContext allows you to access form methods from the parent FormProvider context
	const { watch, control, unregister, reset, setValue, handleSubmit } =
		useFormContext<Schema>();

	// useWatch - Hook to monitor specific fields or the entire form's state in real time
	// useWatch doesn’t trigger unnecessary re-renders of the entire component tree
	const id = useWatch({ control, name: 'id' });
	const variant = useWatch({ control, name: 'variant' });

	const userQuery = useUser(id);

	useEffect(() => {
		// watch() - This method allows you to monitor specific form fields or the entire form’s values in real-time
		const sub = watch((value) => {
			console.log(value);
		});
		// when a component unmounts, it should clean up any active subscriptions
		// we need to unsubscribe when the component unmounts to prevent memory leaks
		return () => sub.unsubscribe();
	}, [watch]);

	// control is a central object uses internally to manage the state, validation, and registration of form inputs
	// control is required as a prop for components that need to register fields dynamically or manage complex field types
	const isTeacher = useWatch({ control, name: 'isTeacher' });

	// useFieldArray - Hook for managing arrays of form fields (e.g., dynamically adding/removing fields) in react-hook-form
	// Commonly used in forms requiring multiple dynamic entries, like lists of addresses or items
	// append - appends a new item to the field array, adding a new field to the form dynamically
	// fields - object represents the current array of field items and provides data on each field within the array
	// remove - removes a specific item from the field array by index
	const { append, fields, remove, replace } = useFieldArray({
		control,
		name: 'students',
	});

	const handleUserClick = (id: string) => {
		// setValue allows you to set the value of a specific form field programmatically
		// useful when you want to update the value of a form field in response to external input or API data
		setValue('id', id);
	};

	useEffect(() => {
		if (!isTeacher) {
			// replace - replaces the entire field array with a new array of items
			replace([]);
			// unregister - function removes a form field from react-hook-form's internal tracking, essentially “deregistering” it
			// removes the 'students' field from the form's internal state when isTeacher is false
			unregister('students');
		}
	}, [isTeacher, replace, unregister]);

	useEffect(() => {
		if (userQuery.data) {
			// resets the form values to either their default values or to specific values you provide.
			reset(userQuery.data);
		}
	}, [reset, userQuery.data]);

	const handleReset = () => {
		reset(defaultValues);
	};

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

	return (
		<Container
			maxWidth="sm"
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack sx={{ flexDirection: 'row', gap: 2 }}>
				<List subheader={<ListSubheader>Users</ListSubheader>}>
					{usersQuery.data?.map((user) => (
						<ListItem disablePadding key={user.id}>
							<ListItemButton
								onClick={() => handleUserClick(user.id)}
								selected={id === user.id}
							>
								<ListItemText primary={user.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>

				<Stack sx={{ gap: 2 }}>
					{/* Schema defines the shape of data expected by react-hook-form in this specific component */}
					{/* Schema helps TypeScript understand what fields are available in the form */}
					{/* in this case, TypeScript ensures that the name prop in <RHFTextField<Schema>> is a valid field defined in Schema */}
					<RHFTextField<Schema> name="name" label="Name" />
					<RHFTextField<Schema> name="email" label="Email" />
					<RHFAutocomplete<Schema>
						name="states"
						label="States"
						options={statesQuery.data}
					/>
					<RHFToggleButtonGroup<Schema>
						name="languagesSpoken"
						options={languagesQuery.data}
					/>
					<RHFRadioGroup<Schema>
						name="gender"
						options={gendersQuery.data}
						label="Gender"
					/>
					<RHFCheckbox<Schema>
						name="skills"
						options={skillsQuery.data}
						label="Skills"
					/>

					<RHFDateTimePicker<Schema>
						name="registrationDateAndTime"
						label="Registration Date & Time"
					/>
					<Typography>Former Employment Period:</Typography>
					<RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
					<RHFSlider<Schema>
						name="salaryRange"
						label="Salary Range"
					/>
					<RHFSwitch<Schema>
						name="isTeacher"
						label="Are you a teacher?"
					/>

					{isTeacher && (
						<Button
							onClick={() => append({ name: '' })}
							type="button"
						>
							Add new student
						</Button>
					)}

					{fields.map((field, index) => (
						<Fragment key={field.id}>
							<RHFTextField<Schema>
								name={`students.${index}.name`}
								label="Name"
							/>
							<Button
								color="error"
								onClick={() => {
									remove(index);
								}}
								type="button"
							>
								Remove
							</Button>
						</Fragment>
					))}

					<Stack
						sx={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Button variant="contained" type="submit">
							{variant === 'create' ? 'New user' : 'Edit user'}
						</Button>
						<Button onClick={handleReset}>Reset</Button>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}

// db.json
{
	"states": [
		{
			"id": "1",
			"label": "California"
		},
	],
	"languages": [
		{
			"id": "1",
			"label": "English"
		},
	],
	"genders": [
		{
			"id": "1",
			"label": "Male"
		},
		{
			"id": "2",
			"label": "Female"
		}
	],
	"skills": [
		{
			"id": "1",
			"label": "Productive"
		},
	],
	"users": [
		{
			"email": "james@gmail.com",
			"formerEmploymentPeriod": [
				"Thu Jan 18 2024 05:36:58 GMT+0800 (Philippine Standard Time)",
				"Thu Jan 18 2024 05:36:58 GMT+0800 (Philippine Standard Time)"
			],
			"name": "David",
			"gender": "1",
			"languagesSpoken": ["1", "2"],
			"registrationDateAndTime": "Thu Jan 18 2024 05:36:58 GMT+0800 (Philippine Standard Time)",
			"salaryRange": [0, 2000],
			"skills": ["1", "2"],
			"states": ["1", "2"],
			"isTeacher": true,
			"students": [
				{
					"name": "1111"
				},
				{
					"name": "2222"
				}
			],
			"id": 1
		},
	]
}

// json server
// index.js
const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
	setTimeout(next, 0);
});
server.use(router);

const app = express();
app.use(server);

const PORT = 8080;
app.listen(PORT, () => {
	console.log('Server is running on...');
});

```

### Snippets

```jsx
// Reusable Wrapper Component
const FormField = ({
	label,
	name,
	register,
	validation,
	error,
	type = 'text',
}) => (
	<>
		<label>{label}</label>
		<input {...register(name, validation)} type={type} />
		{error && <p>{error.message}</p>}
	</>
);

<FormField
	label="Email"
	name="email"
	register={register}
	validation={emailValidation}
	error={errors.email}
/>;

// Practical Example with React Hook Form and RTK Query
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../api/userApi';

const UserProfileForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [updateUser, { isLoading, isSuccess, error }] =
		useUpdateUserMutation();

	const onSubmit = async (data) => {
		try {
			await updateUser(data).unwrap();
			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Failed to update profile:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Email:</label>
			<input {...register('email', emailValidation)} />
			{errors.email && <p>{errors.email.message}</p>}

			<label>Username:</label>
			<input {...register('username', usernameValidation)} />
			{errors.username && <p>{errors.username.message}</p>}

			<button type="submit" disabled={isLoading}>
				{isLoading ? 'Updating...' : 'Update Profile'}
			</button>

			{error && <p>Failed to update profile</p>}
			{isSuccess && <p>Profile updated successfully!</p>}
		</form>
	);
};
```

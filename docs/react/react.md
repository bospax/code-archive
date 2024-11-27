---
sidebar_position: 1
---

# React JS Library

### Setup & Configuration

```jsx
// installing using vite
npm create vite@latest project-name

// run the app
cd project-name
npm install
npm run dev

// run the server
npm run server

// compile and build the app for production
// this will create a 'dist' folder that will be uploaded into the hosting service
npm run build

// when using vite
// preview the production version of the app
// this will create a server for testing production built of the app
npm run preview

// configuration
// code in vite.config.js file
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8000', // port for the backend server
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});

// setup and configuration
// code in main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

```

### Working with Components

```jsx
// creating the basic component
const App = () => {
	return <h1>Hello React!</h1>;
};
export default App;

// importing components
import MainLayout from './layouts/MainLayout';

// using the component inside a component
const App = () => {
	return <MainLayout />;
};
export default App;

// code inside MainLayout.jsx
import { Outlet } from 'react-router-dom'; // importing component from a package
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';

const MainLayout = () => {
	return (
		<> // fragments use to render multiple element without using a div as root parent
			<Navbar />
			<Outlet />
			<ToastContainer />
		</>
	);
}
// exporting the component
export default MainLayout;

// HOC - higher order components
// a reusable component that takes another component as an argument and make modification
const withLogging = (WrappedComponent) => {
	return (props) => {
		console.log('Props passed to component:', props);
		return <WrappedComponent {...props} />;
	};
};

// basic component
const MyComponent = ({ name }) => {
  	return <div>Hello, {name}!</div>;
};

// using the HOC to enhance the component
const EnhancedComponent = withLogging(MyComponent);

const App = () => {
  	return <EnhancedComponent name="Alice" />;
};
```

### States & Hooks

```jsx
// useState hook
// use for storing reactive variable
// syntax: type [getter, setter] = useState(default value);
import { useState } from 'react'; // import the useState hook

const App = () => {
	const [count, setCount] = useState(0);
	const [title, setTitle] = useState('');
	const [jobs, setJobs] = useState([]);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState('Sample String');

	return <p>{count}</p>; // render the value using {} jsx syntax
};

// setting initial value from a function call
const getStoredValue = () => {
    const storedValue = localStorage.getItem('key') || '';
    return storedValue;
};

const [value, setValue] = useState(getStoredValue);

// setting the state value using a button click
// when passing a function in the state setter it always has the previous state as a parameter
<button onClick={() => setState((prevState) => !prevState)}>Read More</button>;

// using the previous state to manipulate the original array
// note: this is not ideal approach for multiple concurrent users
<form
	onSubmit={(e) => {
		e.preventDefault();

		setTodos((previous) => [
			...previous,
			{
				id: id,
				content: todoCotent,
				isCompleted: false,
			},
		]);
	}}
></form>;

// getting the previous state to change a one property of an object
const [car, setCar] = useState({
	brand: 'Ferarri',
	color: 'red',
	model: '2023',
});

// this will spread the previous data and change a property
setCar((prev) => ({ ...prev, color: 'blue' }));

// useEffect hook
// allows you to perform side effects in function components when mounted
// basic syntax:
useEffect(() => {}, []);
useEffect(() => {
	// side effect logic here
}, []);

// if array is empty the effect/callback only run once after the initial render
useEffect(() => {}, []);

// if the array is omitted the effect runs when there is a state changes inside the component (re-renders)
useEffect(() => {});

// an effect/callback will run when dependency changes
useEffect(() => {}, [dependency1, dependency2]);

// using side effect to call an api
useEffect(() => {
	const fetchData = async () => {
		const response = await fetch('https://api.example.com/data');
		const data = await response.json();
		setData(data);
	};

	fetchData();
}, []);

// run an effect when component mounts / unmounts
useEffect(() => {
	console.log('Component mounted');

	return () => {
		console.log('Component unmounted');
	};
}, []);

// useRef hook
// allows to create a variable/state but upon state changes will not re-render the component
// also use to access DOM elements
// syntax and default value:
const count = useRef(0);

// referencing a DOM element
const element = useRef();
<input ref={element} />;

// access element using current property
console.log(element.current);

// useMemo hook
// memoized or cache a value so it will not be recalculated.
// only runs when one of its dependency gets updated
// useful for filtering, sorting, or transforming large data

// syntax:
const variable = useMemo(() => {}, []);

// this function will always re-evaluated/executed when component re-renders because of state changes
function cubeNum(num) {
	return Math.pow(num, 3);
}

const result = cubeNum(number);

// using useMemo to memoized the result
// the function 'cubeNum' will only executed when the 'number' dependecy changes
const result = useMemo(() => cubeNum(number), [number]);

// React.memo
// cached the component so it will not re-render if props or state did not change
const Header = () => {};
export default React.memo(Header);

// child component of ProductList
const Product = React.memo(({ name, price }) => {
	console.log("Product rendered");
	return <div>{name} - ${price}</div>;
});

// in this example, if the products array doesn't change,
// the Product component won’t re-render even if the ProductList component re-renders.
// parent component
const ProductList = ({ products }) => {
	return (
		<div>
			{products.map((product) => (
				<Product key={product.id} name={product.name} price={product.price} />
			))}
		</div>
	);
};

// useCallback Hook
// when a component re-renders it will make all function inside the component a new instance
// when a parent component re-renders all of the function inside of it will make a new instance
// so if it has a child component with function pass into it as a prop it will make the child component re-render

// avoid this using useCallback hook
// normal function definition:
const newFunc = () => {};

// with useCallback hook:
// the function will only make a new instance if the dependency changes
const newFunc = useCallback(() => {}, []);
<Header newFunc={newFunc} />;

// in this example the function will re-created with the latest value of variable when dependency changes
const handleClick = useCallback((id) => {
  	console.log(`You have ${productCount} products in your cart`);
}, [productCount]);

// useContext Hook
// manages global data in the app
// allows access data from any component without passing it down as a props
// steps to use context hook:
// 1. create the context
// code inside src/context/AuthContext.jsx
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const value = { user, isLoggedIn };

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// 2. provide the context
// code inside project/main.jsx
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>
);

// 3. consume the context inside other component
const { user, isLoggedIn } = useContext(AuthContext);

// creating a function to use and export the context in src/context/AuthContext.jsx
export const useAuth = () => useContext(AuthContext);

// and then consume inside other component
import { useAuth } from '../context/AuthContext';
const auth = useAuth();
auth.user;
auth.isLoggedIn;

// useReducer hook
// can use to manage and update state and make complex manipulation, conditions or actions
// unlike useState hook that directly transform the variable/state
// syntax:
useReducer(() => {}, []);

// initial state - state variable, can be anything like array, objects, strings etc.
const initialState = { count: 0 };
useReducer(() => {}, initialState);

// reducer - the function that will manipulate the state
// reducer always takes state and action as arguments and returns a new state
// state - receives the initial or current state before dispatch
// action - receives the arguments from dispatch function
const reducer = (state, action) => {};

// new value of the state will be the value returned by the reducer after dispatch
const reducer = (state, action) => {
	switch (action.type) {
		case 'increase': {
			return { count: state.count + 1 };
		}
		default: {
			return state;
		}
	}
};

// useReducer hook returns the state and dispatch function
// state - current state of the variable
// dispatch - function to send actions to the reducer and update the state accordingly
const [state, dispatch] = useReducer(reducer, initialState);

<h1>{state.count}</h1>
<button onClick={() => dispatch({ type: 'increase' })}>Increase</button>;

// useLayoutEffect hook
// works like useEffect but called before the DOM elements gets mounted
useLayoutEffect(() => {}, []);

// Custom hooks
// user defined hooks that uses hooks available from react
// custom hooks is helpful to create a reusable functions across the application
// code inside src/hooks/useLocalStorage.jsx
export const useLocalStorage = (key, initialValue) => {
	const getStoredValue = () => {
		const storedValue = localStorage.getItem(key) || initialValue;
		return storedValue;
	};

	const [value, setValue] = useState(getStoredValue);

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [key, value]);

	return [value, setValue];
};

// using the custom hook
const [name, setName] = useLocalStorage('username', '');

// using a custom hook to separate the hook logic from the ui
// code in SignIn/SignInPage.Hooks.tsx
export const useSignInPage = () => {
	useEffect(() => {}, []); // hook 1
	useEffect(() => {}, []); // hook 2
	// other effect goes here
}

// using the custom hook
// code in SignInPage.tsx
const SignInPage = () => {
	useSignInPage();
}

// creating a custom hook with component
const useToggle = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => setIsToggled((prev) => !prev);

    const ToggleButton = () => (
        <button onClick={toggle}>
            {isToggled ? 'On' : 'Off'}
        </button>
    );

    // return the current state and the ToggleButton component
    return { isToggled, ToggleButton };
};

// using the custom hook
import useToggle from './useToggle';

const App = () => {
    const { isToggled, ToggleButton } = useToggle();

    return (
        <div>
            <h1>Toggle Example</h1>
            <ToggleButton />
        </div>
    );
};
```

### Props

```jsx
// props - properties
// used to pass data from one component to another
// code in parent component:
const App = () => {
	return <Greeting name="John" />;
};

// props received in child component
// props - special variable that holds the props
const Greeting = (props) => {
	return <h1>Hello, {props.name}!</h1>;
};

// props destructuring
const Greeting = ({ name }) => {
	return <h1>Hello, {name}!</h1>;
};

// passing multiple props
// code in parent:
const App = () => {
	return <Greeting name="John" age={30} isStudent={false} />;
};

// props received in child component
const Greeting = ({ name, age, isStudent }) => {
	return <div>{name}</div>;
};

// set default values for props in case they are not provided by the parent component
const Greeting = ({ name, age = 18, isStudent = true }) => {
	return <div>{name}</div>;
};

// passing functions as props
// the function in a parent component will be pass into the child
const App = () => {
	const sayHello = (name) => {
		alert(`Hello, ${name}!`);
	};

	return <Greeting name="John" onGreet={sayHello} />;
};

// the function will be receive by the child and use it accordingly
const Greeting = ({ name, onGreet }) => {
	return <button onClick={() => onGreet(name)}>Greet</button>;
};

// prop validation using PropTypes
// validate each type of props receive
import PropTypes from 'prop-types';

const Greeting = ({ name, age, isStudent, onGreet }) => {
	return <button onClick={() => onGreet(name)}>Greet</button>;
};

Greeting.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number,
	isStudent: PropTypes.bool,
	onGreet: PropTypes.func.isRequired,
};

Greeting.defaultProps = {
	age: 18,
	isStudent: true,
};

// passing html element as a prop value
const App = () => {
	const CustomMessage = <span>This is a custom message!</span>;

	return <Greeting name="John" customMessage={CustomMessage} />;
};

// render the html element receive as props
const Greeting = ({ name, customMessage }) => {
	return <div>{customMessage}</div>;
};

// children prop
// a special prop that represents the content inside the opening and closing tags of a component
// content inside the component tags will be hold by children prop
const App = () => {
	return (
		<Greeting name="John">
			<p>This is a child element inside the Greeting component.</p>
		</Greeting>
	);
};

const Greeting = ({ name, children }) => {
	return <div>{children}</div>;
};
```

### Conditionals

```jsx
// rendering a class with conditions
// define the function that will hold the condition
const linkClass = ({ isActive }) => (isActive ? 'bg-black' : 'text-white');

// component with className attribute
<NavLink to="/" className={linkClass} />;

// css properties with conditions
// <div
// 	className="diagram"
// 	style={{ display: isLoading ? 'none' : 'block' }}
// ></div>;

// rendering a component based on condition
const JobListings = ({ isHome = false }) => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="container-xl">
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className="grid"></div>
			)}
		</div>
	);
};

// changing classes from css module with conditions
/* ButtonStyles.module.css */
.defaultButton {
	background-color: blue;
	color: white;
}

.loadingButton {
	background-color: grey;
	color: lightgrey;
}

import styles from './ButtonStyles.module.css';

const ConditionalButton = () => {
	const [loading, setLoading] = useState(false);

	return (
		<Button
			className={loading ? styles.loadingButton : styles.defaultButton} onClick={() => setLoading(!loading)}
		>
			{loading ? 'Loading...' : 'Submit'}
		</Button>
	);
};

// Conditional Styling with Inline Styles
const ConditionalCard = () => {
	const [selected, setSelected] = useState(false);

	const cardStyles = {
		border: selected ? '2px solid green' : '1px solid grey',
		backgroundColor: selected ? '#e8f5e9' : '#ffffff'
	};

	return (
		<Card style={cardStyles} onClick={() => setSelected(!selected)}>
			<CardContent>
				<Typography variant="h5">Conditional Card</Typography>
				<Typography variant="body2">
					{selected ? 'Selected' : 'Not Selected'}
				</Typography>
			</CardContent>
		</Card>
	);
};

// Combining CSS Classes and Inline Styles for Advanced Conditions
// using template literals to combine classes with conditions
/* ButtonStyles.module.css */
.defaultButton {
	font-size: 1rem;
	padding: 10px 20px;
}

.disabledButton {
  	background-color: #cccccc;
}

.activeButtonBorder {
  	border: 2px solid green;
}

.inactiveButtonBorder {
  	border: 2px solid red;
}

import styles from './ButtonStyles.module.css';

const AdvancedConditionalButton = ({ disabled }) => {
	const [active, setActive] = useState(false);

	return (
		<Button
			className={`${styles.defaultButton} ${disabled ? styles.disabledButton : ''} ${active ? styles.activeButtonBorder : styles.inactiveButtonBorder}`}
			disabled={disabled}
			onClick={() => setActive(!active)}
		>
			{active ? 'Active' : 'Inactive'}
		</Button>
	);
};

// classnames library - is used here for conditional styling.
// variant prop determines whether the button is primary or secondary.
npm install classnames

import classNames from 'classnames';

// combine multiple class names into a single string. It automatically ignores any false, null, or undefined values
function Button({ primary }) {
	return (
		<button
			className={classNames(
				"px-4 py-2 rounded", // Basic button styling
				primary && "bg-blue-500 text-white" // Conditional primary style
			)}
		>
			Click Me
		</button>
	);
}

// You can pass a mix of strings, objects, and variables. This is useful when some classes are always applied and others are conditional
function Alert({ type }) {
	return (
		<div
			className={classNames(
				"p-4 rounded",
				"text-white font-semibold",
				{
					"bg-green-500": type === "success",
					"bg-red-500": type === "error",
					"bg-yellow-500": type === "warning",
				}
			)}
		>
			This is an alert
		</div>
	);
}

const Button = ({ children, variant }) => {
	const buttonClass = classNames('py-2 px-4 rounded', {
		'bg-brand text-white': variant === 'primary',
		'bg-gray-300 text-gray-700': variant === 'secondary',
		'hover:bg-brand-dark': variant === 'primary',
	});

	return <button className={buttonClass}>{children}</button>;
};

// usage:
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>

// classnames also supports arrays
// making it flexible for scenarios where you might add classes conditionally from different sources
const extraClasses = ["p-4", "bg-blue-100"];
const errorClasses = { "text-red-500": hasError };

const inputClasses = classNames(
	"rounded border",
	extraClasses,
	errorClasses
);

<input className={inputClasses} />

// Handling Complex Class Combinations in Functions
// create a helper function that builds your classes based on specific logic
function getButtonClasses({ isPrimary, isDisabled }) {
	return classNames(
		"px-4 py-2 rounded",
		{
			"bg-blue-500 text-white": isPrimary,
			"bg-gray-500 text-gray-200": !isPrimary,
			"opacity-50 cursor-not-allowed": isDisabled,
		}
	);
}

function Button(props) {
  	return <button className={getButtonClasses(props)}>Button</button>;
}

// rendering a component using logical operators
// && - if left side expression is true, right side expression will be rendered
const UserProfile = ({ isLoggedIn, user }) => {
	return (
		<div>
			{isLoggedIn && (
				<div>
					<p>User: {user.name}</p>
					<p>Email: {user.email}</p>
				</div>
			)}
		</div>
	);
};

// || - if left side expression is false, right side expression will be rendered or else will be ignored
const UserGreeting = ({ username }) => {
	return (
		<div>
			<h1>Hello, {username || 'Guest'}!</h1>
		</div>
	);
};

const UserDetails = ({ isLoggedIn, username, email }) => {
	return (
		<div>
			{isLoggedIn ? (
				<div>
					<h1>Hello, {username || 'Guest'}!</h1>
					<p>Email: {email || 'No email provided'}</p>
				</div>
			) : (
				<p>Please log in to view your details.</p>
			)}
		</div>
	);
};

// rendering content using switch statement
const [activeTab, setActiveTab] = useState(1);

const renderContent = () => {
	switch (activeTab) {
		case 1:
			return <Component1 />;
		case 2:
			return <Component2 />;
		case 3:
			return <Component3 />;
		default:
			return null;
	}
};

<div>{renderContent()}</div>;
```

### Snippets

```jsx
// looping through components using map method
<div className="grid">
	{jobs.map((job) => (
		<JobListing key={job.id} job={job} />
	))}
</div>;

// looping using index of array as key
// using shorthand arrow function enclosed by parenthesis
<ol className="timeline">
	{careerData.map((career, index) => (
		<Career key={index} career={career} />
	))}
</ol>

// using arrow function with explicit return statement enclosed by curly braces
<ol className="timeline">
	{careerData.map((career, index) => {
		return <Career key={index} career={career} />;
	})}
</ol>

// input field with two way binding
const [title, setTitle] = useState('');
<input value={title} onChange={(e) => setTitle(e.target.value)} />;

// adding a additional class based on the value of a prop
// using template literals to combine variable with a string
const Card = ({ children, bg = 'bg-gray-100' }) => {
	return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

// using template literals to make a dynamic link with variables
<a href={`/job/${id}`}>Read More</a>;

// working with forms
// form submission
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

// function for adding data into the server
<Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />;

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

// creating a reusable button component
export default function Button({ buttonType, onClick, children }) {
	return (
		<button onClick={onClick} className={`flex ${buttonType}`}>
			{children}
		</button>
	);
}

<Button buttonType="primary" onClick={() => login()}>
	Login
</Button>;

// full example of using useReducer hook
const initialState = { count: 0 };

const reducer = (state, action) => {
	switch (action.type) {
		case 'increase': {
			return { count: state.count + 1 };
		}
		case 'decrease': {
			return { count: state.count - 1 };
		}
		case 'input': {
			return { count: action.payload };
		}
		default: {
			return state;
		}
	}
};

const [state, dispatch] = useReducer(reducer, initialState);

return (
	<>
		<h1>{state.count}</h1>
		<button onClick={() => dispatch({ type: 'increase' })}>Increase</button>
		<button onClick={() => dispatch({ type: 'decrease' })}>Decrease</button>
		<br />
		<input
			value={state.count}
			onChange={(e) =>
				dispatch({
					type: 'input',
					payload: Number(e.target.value),
				})
			}
			type="number"
		/>
	</>
);

// managing multiple providers using context api
// file structure
src/
├── context/
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   └── UserProfileContext.js
└── App.js

// src/Providers.jsx
export default const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <UserProfileProvider>
                    {children}
                </UserProfileProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);

// using React.memo, useMemo, useCallback hook all together
const Product = React.memo(({ product, onBuy }) => {
	console.log("Product rendered");
	return (
		<div>
			{product.name} - ${product.price}
			<button onClick={() => onBuy(product.id)}>Buy</button>
		</div>
	);
});

const ProductList = ({ products }) => {
	const sortedProducts = useMemo(() => {
		console.log("Sorting products...");
		return products.sort((a, b) => a.price - b.price);
	}, [products]);

	const handleBuy = useCallback((id) => {
		console.log("Buying product:", id);
	}, []);

	return (
		<div>
			{sortedProducts.map((product) => (
				<Product key={product.id} product={product} onBuy={handleBuy} />
			))}
		</div>
	);
};

// components with data filtering
// code in ProjectPage.jsx
const ProjectPage = () => {
	const [selectedFilter, setSelectedFilter] = useState('webapp');

	const filteredProjects = ProjectData.filter((project) => {
		return project.category === selectedFilter;
	});

	const handleFilterClick = (filter) => {
		setSelectedFilter(filter);
	};

	return (
		<>
			<ProjectFilter
				selectedFilter={selectedFilter}
				onFilterClick={handleFilterClick}
			/>
			<ProjectList projects={filteredProjects} />
		</>
	);
};

// code in ProjectFilter.jsx
const ProjectFilter = ({ selectedFilter, onFilterClick }) => {
	return (
		<button
			className={`filter-item ${
				selectedFilter === 'webapp' ? 'active' : ''
			}`}
			onClick={() => onFilterClick('webapp')}
		>
			WEB APPS
		</button>
	);
};

// creating an HOC with reusable data fetching
// in this case the HOC make use of function currying pattern
const withDataFetching = (url) => (WrappedComponent) => {
	return (props) => {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			fetch(url)
				.then((response) => response.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setLoading(false);
				});
		}, [url]);

		if (loading) {
			return <div>Loading...</div>;
		}

		return <WrappedComponent {...props} data={data} />;
	};
};

const UserComponent = ({ user }) => {
	return (
		<div>
			<h2>User Information</h2>
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
		</div>
	);
};

// applying the HOC to a component to fetch user data
const EnhancedUserComponent = withDataFetching('https://jsonplaceholder.typicode.com/users/1')(UserComponent);

const App = () => {
  	return <EnhancedUserComponent />;
};

// advantage of function currying
// separation of configuration
const fetchUser = withDataFetching('https://jsonplaceholder.typicode.com/users/1');
const fetchPosts = withDataFetching('https://jsonplaceholder.typicode.com/posts/1');

// Now you can use the pre-configured HOCs with different components
const EnhancedUserComponent = fetchUser(UserComponent);
const EnhancedPostComponent = fetchPosts(PostComponent);

// HOC without function currying
const withDataFetching = (url, WrappedComponent) => {
	return (props) => {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			fetch(url)
				.then((response) => response.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setLoading(false);
				});
		}, [url]);

		if (loading) {
			return <div>Loading...</div>;
		}

		return <WrappedComponent {...props} data={data} />;
	};
};

const EnhancedUserComponent = withDataFetching('https://jsonplaceholder.typicode.com/users/1', UserComponent);

const App = () => {
  	return <EnhancedUserComponent someProp="value" />;
};

```

### Importing Assets

```jsx
// basic importing of css stylesheet
// code in main.jsx file
import './index.css'; // location: project/src/index.css

const style = {
	display: 'block',
	margin: '100px auto',
	backgroundColor: 'red',
};

// importing a basic image
// code in src/components/Logo.jsx
import logo from '../assets/image/logo.png'; // location: project/src/assets/image/logo.png
<img src={logo} />;

import reactLogo from './assets/react.svg'; // location: project/src/assets/react.svg
import viteLogo from '/vite.svg'; // location: project/public/vite.svg

// importing a data from a json file
// code inside a json file:
[
	{
		id: '1',
		title: 'Senior React Developer',
		type: 'Full-Time',
	},
	{
		id: '2',
		title: 'Front-End Engineer (React & Redux)',
		type: 'Full-Time',
	},
];

// import the json file inside the component
import jobs from '../jobs.json';

// importing package of icons
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
<FaArrowLeft className="mr-2" />
<FaMapMarker className="text-orange-700 mr-1" />

// importing constants / variables
export const MAX_FREE_TODOS = 3;
import { MAX_FREE_TODOS } from '/lib/constants';

// importing from CDN library
// put the cdn link in project/index.html file
<head>
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
</head>

// access via window object in component
const MyComponent = () => {
	useEffect(() => {
		// access the global Typed.js from the window object
		const typed = new window.Typed('#typing-element', {
			strings: ["Hello, I'm Jose!"],
			typeSpeed: 50,
			backSpeed: 50,
			loop: true,
		});

		// access the global particles.js from the window object
		window.particlesJS.load(
			'particles-js',
			'/particlesjs-config.json',
			function () {
				console.log('Particles.js loaded!');
			}
		);

		// clean up the typed instance on unmount
		return () => {
			typed.destroy();
		};
	}, []);

	return (
		<div>
			<div id="particles-js"></div>
			<span className="typed-element"></span>
		</div>
	);
};

// importing packages using npm
npm install typed.js

// use package in component
import Typed from 'typed.js';

const MyComponent = () => {
	useEffect(() => {
		// initialize Typed.js
		const typed = new Typed('.typed-element', {
			strings: ["Hello", "World", "React App!"],
			typeSpeed: 50,
		});

		// cleanup for typed.js
		return () => {
			typed.destroy();
		};
	}, []);

	return <span className="typed-element"></span>;
};
```

### Styling Methods

```jsx
// CSS Stylesheets (Global CSS)
/* App.css */
.container {
  background-color: lightgray;
  color: black;
}

import './App.css';

function MyComponent() {
  return <div className="container">Hello, CSS Stylesheets!</div>;
}
```

```jsx
// Inline Styles
// CSS properties are camelCased (e.g., backgroundColor), as they follow JavaScript conventions
// Cons: Limited support for pseudo-classes and media queries; styles are scoped to a single element
const styles = {
	backgroundColor: 'blue',
	color: 'white',
};

function MyComponent() {
	return <div style={styles}>Hello, Inline Styles!</div>;
}
```

```jsx
// CSS Modules
// CSS Modules scope classes locally to the component by default, using a unique identifier
/* MyComponent.module.css */
.container {
  background-color: coral;
  color: white;
}

import styles from './MyComponent.module.css';

function MyComponent() {
  return <div className={styles.container}>Hello, CSS Modules!</div>;
}

// applying global style in css modules
// Apply global styles only to high-level elements (e.g., body, html) and layout containers
/* In App.module.css */
:global(.container) {
	background-color: lightgray;
	color: black;
}

```

```jsx
// Styled-Components (CSS-in-JS)
// A library that allows defining styled components with template literals directly within JavaScript
// Cons: Requires an external library (styled-components); runtime styling can impact performance in large apps
import styled from 'styled-components';

const Container = styled.div`
	background-color: tomato;
	color: white;
`;

function MyComponent() {
	return <Container>Hello, Styled-Components!</Container>;
}
```

```jsx
// Tailwind CSS
// Utility-first CSS framework that offers predefined utility classes
function MyComponent() {
	return (
		<div className="bg-blue-500 text-white p-4">Hello, Tailwind CSS!</div>
	);
}
```

```jsx
// Framer Motion (for Animations)
// best for interactive animations
import { motion } from 'framer-motion';

function MyComponent() {
	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
			Hello, Animation!
		</motion.div>
	);
}
```

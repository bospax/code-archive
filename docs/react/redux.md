# Redux State Management

### Configuration

```jsx
// installing the core redux
npm install redux react-redux

// installing redux with redux thunk
npm install redux redux-thunk

// installing redux toolkit
npm install @reduxjs/toolkit

```

### Setup & Folder Structures

```jsx
// setting up the redux application
// Reducer: A pure function that receives the current state and an action, then returns a new state.
// State: The actual data of your application, stored inside the Redux store.
// counterReducer.js
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + 1 };
		case 'DECREMENT':
			return { count: state.count - 1 };
		default:
			return state;
	}
};

export default counterReducer;

// Action: A plain JavaScript object that describes an intention to change the state. Every action must have a type property.
// actions.js
export const increment = () => ({
	type: 'INCREMENT',
});

export const decrement = () => ({
	type: 'DECREMENT',
});

// Store: Holds the state of the application. There is only one store in a Redux app.
// create the store
import { createStore } from 'redux';
import counterReducer from './counterReducer'; // Import your reducer

const store = createStore(counterReducer);

export default store;

// provide the store in the root component
import { Provider } from 'react-redux';
import store from './store'; // Import the Redux store

<Provider store={store}>
	<App />
</Provider>,

// accessing the store and dispatching an action in the component
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

const Counter = () => {
	const count = useSelector(state => state.count); // Access state from the Redux store
	const dispatch = useDispatch(); // Dispatch actions

	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
		</div>
	);
};

export default Counter;

```

### Core Redux & Multiple Reducers

```jsx
// authReducer.js
// creating the initial state and actions necessary for the auth module
// LOGIN: When this action is dispatched, the user is authenticated, and user data is stored.
// LOGOUT: Clears the user data and marks the user as logged out.
const initialState = {
	isAuthenticated: false,
	user: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;

// productsReducer.js
const initialState = {
  	items: [],
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PRODUCTS': // Sets the products list when it is fetched from an API or other source.
			return {
				...state,
				items: action.payload,
			};
		default:
			return state;
	}
};

export default productsReducer;

// cartReducer.js
const initialState = {
  	items: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				// Removes a product from the cart by filtering it out based on its id
				items: state.items.filter(item => item.id !== action.payload),
			};
		default:
			return state;
	}
};

export default cartReducer;

// combine reducers
// Redux allows us to combine multiple reducers into one root reducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';

// combines all feature reducers into one object. Each reducer manages its own slice of state
const rootReducer = combineReducers({
	auth: authReducer,
	products: productsReducer,
	cart: cartReducer,
});

// With combineReducers, the state is structured like this:
{
	auth: {
		isAuthenticated: false,
		user: null,
	},
	products: {
		items: []
	},
	cart: {
		items: []
	},
}

export default rootReducer;

// creating the redux store
// The store holds the entire app’s state
// store.js
import { createStore } from 'redux';
import rootReducer from './rootReducer';

// The store is now responsible for holding the global state of the app
const store = createStore(rootReducer);

export default store;

// creating the actions
// Instead of hardcoding action objects, you create action creators (functions that return action objects)
// actionCreators.js
export const login = (user) => ({
	type: 'LOGIN',
	payload: user,
});

export const logout = () => ({
  	type: 'LOGOUT',
});

export const setProducts = (products) => ({
	type: 'SET_PRODUCTS',
	payload: products,
});

export const addToCart = (product) => ({
	type: 'ADD_TO_CART',
	payload: product,
});

export const removeFromCart = (id) => ({
	type: 'REMOVE_FROM_CART',
	payload: id,
});

// Ensure Unique Action Types
// best practice to namespace action types to avoid conflicts
export const addToCart = (product) => ({
	type: 'CART/ADD_ITEM',
	payload: product,
});

export const addProduct = (product) => ({
	type: 'PRODUCTS/ADD_ITEM',
	payload: product,
});

// creating action types
// action types are constant variables to define set of action
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Connecting Redux to React components
// <Provider> - make the Redux store available to all components.
import { Provider } from 'react-redux';
import store from './store';

<Provider store={store}>
	<App />
</Provider>

// accessing the store in react components
// Example 1: Display Products
// ProductsList.js
import { useSelector } from 'react-redux';

const ProductsList = () => {
	// useSelector - select state from the store.
	const products = useSelector(state => state.products.items);

	return (
		<ul>
			{products.map(product => (
				<li key={product.id}>{product.name}</li>
			))}
		</ul>
	);
};

export default ProductsList;

// Example 2: Add Product to Cart
// Product.js
import { useDispatch } from 'react-redux';
import { addToCart } from './actionCreators';

const Product = ({ product }) => {
	// useDispatch - dispatch actions.
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<h3>{product.name}</h3>
			<button onClick={handleAddToCart}>Add to Cart</button>
		</div>
	);
};

export default Product;

// Example 3: Display Cart
import { useSelector } from 'react-redux';

const Cart = () => {
	const cartItems = useSelector(state => state.cart.items);
};

// directory structure
/src
	/components
		Cart.js
		Product.js
		ProductsList.js
	/reducers
		authReducer.js
		cartReducer.js
		productsReducer.js
		rootReducer.js
	/actions
		actionCreators.js
	store.js
	index.js
	App.js

```

### Core Redux & Redux Thunk

```jsx
// Redux Thunk
// Redux Thunk handles action creators that return functions instead of plain objects
// which can perform asynchronous operations and dispatch actions conditionally

// creating action types
// actionTypes.js
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// creating the reducers
// reducers/productReducer.js
import {
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
	products: [],
	loading: false,
	error: null,
};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				loading: false,
			};
		case FETCH_PRODUCTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

// creating actions
// actions.js
export const fetchProductsRequest = () => ({
	type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: products,
});

export const fetchProductsFailure = (error) => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: error,
});

// creating an action that makes api call to fetch data from the server
// this type of action will not work without using redux-thunk because it returns a function instead of objects
export const fetchProducts = () => {
	// redux-thunk will handle this returned function and inject the dispatch function automatically
	return async (dispatch) => {
		dispatch(fetchProductsRequest());
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data = await response.json();

			// dispatching the synchronous function that returns a plain object that redux accepts
			dispatch(fetchProductsSuccess(data));
		} catch (error) {
			dispatch(fetchProductsFailure(error.message));
		}
	};
};

// access states from the async function using getState redux parameter
export const addToCartIfLoggedIn = (item) => (dispatch, getState) => {
	const state = getState();
	const isLoggedIn = state.user.isLoggedIn; // Accessing user state from another slice

	if (isLoggedIn) {
		dispatch(addItemToCart(item));
	} else {
		dispatch(setError('Please log in to add items to the cart.'));
	}
};

// creating the root reducer
// reducers/index.js
import { combineReducers } from 'redux';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
	products: productReducer,
});

// adding redux thunk as middleware
// store.js
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// accessing states and dispatching actions
const ProductsList = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return <div></div>;
};
```

### Redux Toolkit & Redux Thunk

```jsx
// basic part of a slice
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
	// name - used to namespace the action types created within that slice. (example: 'auth/login')
	name: 'products',
	initialState: {},
	// reducers field - used for synchronous state updates tied to specific actions
	reducers: {
		addProduct: (state, action) => {
			// payload - property of the action object that holds the data passed when dispatching
			state.products.push(action.payload);
		},
	},
	// extraReducers is used in handling the action types generated by async functions
	// listens for actions that are not explicitly defined in the reducers field
	// for handling async actions
	extraReducers: (builder) => {
		// builder - allows you to define different cases (such as pending, fulfilled, and rejected) using methods like .addCase()
		builder.addCase()
	},
});

// productsSlice.actions - Redux Toolkit generates action creators for each reducer function you define
// productsSlice.reducer - Redux Toolkit also generates the reducer function, which handles updating the state when an action is dispatched
export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;

// creating the slices for every app modules
// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Authentication slice
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		user: null,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload; // payload holds user data
		},
		logout: (state) => { // action parameter is optional if not needed
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch products
export const fetchProducts = createAsyncThunk(
	// 'products/fetchProducts' - the async action type, triggered when you call dispatch(fetchProducts())
	// 3 action types generated by createAsyncThunk():
	// 'products/fetchProducts/pending', 'products/fetchProducts/fulfilled', 'products/fetchProducts/rejected'
	'products/fetchProducts',
	async () => {
		const response = await fetch('https://fakestoreapi.com/products');
		if (!response.ok) throw new Error('Failed to fetch products');
		return response.json();
	}
);

// createSlice helps you generate actions and reducers in one place
const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.loading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export default productsSlice.reducer;

// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) {
				item.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// creating the store and root reducer
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Combine reducers manually if needed
import authReducer from './features/authSlice';
import productsReducer from './features/productsSlice';
import cartReducer from './features/cartSlice';

// Combining reducers into a rootReducer
const rootReducer = combineReducers({
	auth: authReducer,
	products: productsReducer,
	cart: cartReducer,
});

// configureStore is a Redux Toolkit utility that simplifies setting up the store,
// combining reducers, and automatically adding middleware like Thunk
const store = configureStore({
	reducer: rootReducer,
	// This includes default middleware like Thunk, and you can add more if needed
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// adding additional middleware by concatenation
const store = configureStore({
	reducer: {},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(logger) // Adds logger middleware
			.concat(thunk), // Adds redux-thunk if needed separately
});

export default store;

// accessing states and actions in react components
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';

const ProductList = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts()); // Fetch products when the component mounts
	}, [dispatch]); // dispatch doesn’t change, it’s considered a good practice to include it in the dependencies array

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>
					<h2>{product.title}</h2>
					<p>Price: ${product.price}</p>
					<button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
				</li>
			))}
		</ul>
	);
};

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';

const Auth = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	const handleLogin = () => {
		const mockUser = { id: 1, name: 'John Doe' };
		dispatch(login(mockUser));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			{isAuthenticated ? (
				<div>
					<p>Welcome, {user.name}!</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<button onClick={handleLogin}>Login</button>
			)}
		</div>
	);
};

```

### Practical Application of Redux

```jsx
src/
│
├── app/
│   ├── store.js            # Configures and creates the Redux store
│   └── rootReducer.js      # Combines all slices into a root reducer
│
├── features/               # Each slice or feature has its own folder
│   ├── auth/
│   │   ├── authSlice.js    	# Slice for auth-related state
│   │   ├── authActions.js  	# Additional async actions if needed
│   │   ├── authSelectors.js	# Selector functions for auth state
│   │   └── index.js        	# Re-exports for cleaner imports
│   │
│   ├── cart/
│   │   ├── cartSlice.js    	# Slice for cart-related state
│   │   ├── cartActions.js  	# Async actions (e.g., fetchCartItems)
│   │   ├── cartSelectors.js	# Selector functions for cart state
│   │   └── index.js        	# Re-exports for cleaner imports
│   │
│   ├── products/
│   │   ├── productsSlice.js 		# Slice for product-related state
│   │   ├── productsActions.js 		# Async actions for product data
│   │   ├── productsSelectors.js 	# Selector functions for products state
│   │   └── index.js         		# Re-exports for cleaner imports
│   │
│   └── ...                  # Other features (e.g., orders, user profile)
│
├── components/              # Reusable components
│   ├── Auth/
│   ├── ProductList/
│   ├── Cart/
│   └── ...
│
├── pages/                   # Page-level components
│   ├── Home.js
│   ├── ProductDetail.js
│   ├── CartPage.js
│   └── ...
│
├── services/                # Services for API calls or utility functions
│   ├── api.js               # API request functions
│   ├── authService.js       # Auth-related API functions
│   └── cartService.js       # Cart-related API functions
│
└── index.js                 # Entry point with ReactDOM render

```

```jsx
// sample code for every file and folder structure
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
	reducer: rootReducer,
});

export default store;

// src/app/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
	products: productsReducer,
});

export default rootReducer;

// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginAsync } from './authActions';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isLoggedIn: false,
		status: 'idle',
		error: null,
	},
	reducers: {
		logout(state) {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoggedIn = true;
				state.status = 'succeeded';
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


// src/features/auth/authActions.js
// Defines async actions for the auth slice, like loginAsync, which interacts with an API.
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await authService.login(credentials);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// creating a separate selector file
// src/features/auth/authSelectors.js
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;

// Re-exports all modules in auth for simpler imports in components
// src/features/auth/index.js
export * from './authSlice';
export * from './authActions';
export * from './authSelectors';

// re-exporting the default export
export { default as authReducer } from './authSlice';

// after re-exporting the default export it can be imported like a named export
import { authReducer, logout, loginAsync, selectIsLoggedIn, selectAuthUser } from '../../features/auth';

// api.js
// api.js file typically contains configurations and setup for making HTTP requests
// src/services/api.js
import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.example.com', // Base URL for all requests
	timeout: 10000, // Optional timeout setting
});

// Optional: Add interceptors for common request/response behaviors
api.interceptors.request.use(
	(config) => {
		// Add auth token if available
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	// Error Handling: Allows you to define and handle global behaviors (like logging out on authentication errors)
	(error) => {
		// Handle global errors (e.g., log out on 401)
		if (error.response.status === 401) {
			// Optionally log out user or show error
		}
		return Promise.reject(error);
	}
);

export default api;

// creating the services
// src/services/authService.js
import api from './api';

export const authService = {
	login: (credentials) => api.post('/login', credentials),
	register: (data) => api.post('/register', data),
};

// accessing states and action in the component
// src/components/Auth/Login.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectAuthStatus } from '../../features/auth';

const Login = () => {
	const dispatch = useDispatch();
	const status = useSelector(selectAuthStatus);
	const [credentials, setCredentials] = useState({ username: '', password: '' });

	const handleLogin = () => {
		dispatch(loginAsync(credentials));
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Username"
				value={credentials.username}
				onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
			/>
			<input
				type="password"
				placeholder="Password"
				value={credentials.password}
				onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
			/>
			<button onClick={handleLogin} disabled={status === 'loading'}>
				Login
			</button>
		</div>
	);
};

export default Login;
```

### Creating Asynchronous Actions

```jsx
// createAsyncThunk()
// responsible for creating an asynchronous actions
// automate the creation of three states: pending, fulfilled, and rejected
// syntax:
const someAsyncThunkFunction = createAsyncThunk(actionType, asyncFunction);
const someAsyncThunkFunction = createAsyncThunk(
	'products/fetchProducts',
	async () => {}
);

// accessing the payload and thunkAPI
// thunkAPI - holds the dispatch function and other methods
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (payload, thunkAPI) => {
		await fetchProductsLogic(thunkAPI.dispatch);
	}
);

// destructuring thunkAPI for clean access to dispatch and other properties
export const fetchProductById = createAsyncThunk(
	'products/fetchProductById',
	async (productId, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/products/${productId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Dispatching the thunk with a specific ID as payload
<button onClick={() => dispatch(fetchProductById(123))}></button>;

// sending multiple parameter in payload
export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async ({ id, updateData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`/api/products/${id}`, updateData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Dispatching the thunk with an object payload containing multiple values
dispatch(updateProduct({ id: 123, updateData: { name: 'New Product Name' } }));

// Triggering Multiple Synchronous Actions
// example that dispatches multiple synchronous actions in sequence
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (payload, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading()); // Custom action to show loading state

			const response = await axios.get('/api/products');

			dispatch(setProducts(response.data)); // Dispatches the data after fetching
			dispatch(setFetchedTimestamp(new Date().toISOString())); // Another synchronous action to record fetch time

			return response.data;
		} catch (error) {
			dispatch(setError(error.message)); // Custom action to handle errors
			return rejectWithValue(error.message);
		}
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		items: [],
		loading: false,
		error: null,
		fetchedTimestamp: null,
	},
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setProducts: (state, action) => {
			state.items = action.payload;
			state.loading = false;
		},
		setFetchedTimestamp: (state, action) => {
			state.fetchedTimestamp = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { setLoading, setProducts, setFetchedTimestamp, setError } =
	productsSlice.actions;
export default productsSlice.reducer;

// Triggering Multiple Async Actions Sequentially
// This example chains multiple async actions. For instance, we may first fetch a list of products
// then based on the fetched data, trigger another async action
export const fetchProductsAndDetails = createAsyncThunk(
	'products/fetchProductsAndDetails',
	async (payload, { dispatch }) => {
		const response = await dispatch(fetchProducts());

		// .match() method used to check if an action matches a specific action type
		// useful if you want to ensure an action succeeded before running further code
		// checks if the response action matches the fulfilled type of fetchProducts
		// equivalent to: response.type === 'products/fetchProducts/fulfilled'
		if (fetchProducts.fulfilled.match(response)) { // Do something only if the fetchProducts action was fulfilled
			const productIds = response.payload.map((product) => product.id);

			// Dispatch multiple async actions to fetch details for each product
			await Promise.all(
				productIds.map((id) => dispatch(fetchProductDetails(id)))
			);
		} else if (fetchProducts.rejected.match(response)) {
			console.error("Failed to fetch products:", response.error.message);
		}
	}
);

// An async thunk for fetching individual product details
export const fetchProductDetails = createAsyncThunk(
	'products/fetchProductDetails',
	async (productId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/products/${productId}`);
			return { id: productId, details: response.data };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const productDetailsSlice = createSlice({
	name: 'productDetails',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
			const { id, details } = action.payload;
			// Saves details for each product by ID
			state[id] = details;
		});
	},
});

// Combining Synchronous and Async Actions Conditionally
// In this mixed example, let’s fetch product data, then conditionally fetch details if the product is on sale
// and set the loading state before and after each action
export const fetchProductsWithConditionalDetails = createAsyncThunk(
  'products/fetchProductsWithConditionalDetails',
  async (_, { dispatch, rejectWithValue }) => {
    try {
		dispatch(setLoading(true));

		const response = await axios.get('/api/products');
		const products = response.data;

		dispatch(setProducts(products));

		const saleProductIds = products.filter(p => p.onSale).map(p => p.id);

		if (saleProductIds.length) {
			await Promise.all(saleProductIds.map(id => dispatch(fetchProductDetails(id))));
		}

		dispatch(setLoading(false));
    } catch (error) {
		dispatch(setError(error.message));
		dispatch(setLoading(false));
		return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
	name: 'products',
	initialState: { items: [], loading: false, error: null },
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProducts: (state, action) => {
			state.items = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setLoading, setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;

// Usage of All ThunkAPI Properties
// when using createAsyncThunk(), you have access to the ThunkAPI object
// which provides several useful methods and properties for handling asynchronous logic
export const fetchDataWithExtras = createAsyncThunk(
	'example/fetchData',
	async (payload, { dispatch, getState, extra, requestId, signal, rejectWithValue, fulfillWithValue }) => {
		try {
			// getState() Provides access to the current Redux state.
			// commonly used to access other parts of the state tree before making decisions or crafting requests based on the state
			const someStateValue = getState().someSlice.value;

			// requestId - A unique ID generated for each thunk call instance.
			// This can be used to identify a specific instance of a thunk call, useful for managing and canceling multiple in-flight requests
			console.log("Request ID:", requestId);

			// signal - can be used to cancel a thunk if needed
			// determine if the thunk should stop processing before making a request
			// Checking if the thunk was already aborted
			if (signal.aborted) {
				console.log("Aborted, exiting thunk");
				return;
			}

			// extra - Allows you to pass in additional values or dependencies when configuring the store.
			// This is often used to provide APIs, services, or other dependencies to the thunk without directly importing them
			const response = await extra.apiService.fetchData(someStateValue);

			// dispatch() Allows you to dispatch other actions from within the thunk.
			// This can be useful for dispatching additional actions as side effects of the async operation
			dispatch(anotherAction(response.data));

			// fulfillWithValue() - Enables returning a custom fulfillment value
			// return a modified result or additional data along with the result
			return fulfillWithValue({
				data: response.data, // access in reducer as 'action.payload.data'
				requestId,
				additionalInfo: 'Fetched with extra details'
			});

		} catch (error) {
			// rejectWithValue() - Allows you to return a custom rejection value.
			// This is particularly useful for handling errors in a consistent way across your app
			return rejectWithValue('Failed to fetch data');
		}
	}
);

// To utilize the extra property with apiService in createAsyncThunk,
// you can pass dependencies (such as an API service) to the extra field when configuring your Redux store
// creating a service:
// src/services/apiService.js
export const apiService = {
	async fetchData(someValue) {
		// fetch logic here
	}
};

// Configuring the Store with extra Dependencies
// src/app/store.js
import { apiService } from '../services/apiService';

const store = configureStore({
	reducer: {},
	// Pass the apiService as `extra`
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				// assign apiService to the extraArgument option, which is accessible in all thunks as 'extra'
				extraArgument: { apiService },
			},
		}),
});

```

### Creating Synchronous Actions

```jsx
// createAction('MIDDLEWARE/REGISTER') generates a function, registerMiddlewareAction
// when called, returns an action object with the type 'MIDDLEWARE/REGISTER'
import { createAction } from '@reduxjs/toolkit';

const registerMiddlewareAction = createAction('MIDDLEWARE/REGISTER');

// This is equivalent to manually writing
const registerMiddlewareAction = (middleware) => ({
	type: 'MIDDLEWARE/REGISTER',
	payload: middleware,
});

// registerMiddlewareAction(middleware) will return an object like
{
	type: 'MIDDLEWARE/REGISTER',
	payload: middleware
}

// two way to dispatch synchronous actions
store.dispatch(registerMiddlewareAction(middleware));
store.dispatch({ type: 'MIDDLEWARE/REGISTER', payload: middleware });
```

### Creating a Middleware

```jsx
// Middlewares are typically side-effect handlers that intercept actions before they reach the reducers
// Middleware allows this action to be handled without affecting the state
// making it ideal for logging, monitoring, and triggering secondary effects without state mutations
import { configureStore, createAction } from '@reduxjs/toolkit';

const registerMiddlewareAction = createAction('MIDDLEWARE/REGISTER');

// This is a middleware function. Middleware functions are structured as a series of three nested functions (store, next, and action)
const middlewareLogger = (store) => (next) => (action) => {};

// store: Gives access to the Redux store.
// next: A reference to the next middleware in line, or the reducer if there’s no middleware after this one.
// action: The dispatched action that the middleware will process
const middlewareLogger = (store) => (next) => (action) => {
	// This condition checks if the action being processed has a type that matches registerMiddlewareAction.type
	if (action.type === registerMiddlewareAction.type) {
		console.log('Registered Middleware:', action.middleware);
	}

	// calls next(action), allowing the action to pass through to the next middleware in line or, if there isn’t one, to the reducer
	return next(action);
};

// In Redux, middleware receives every action dispatched to the store.
// Since middlewareLogger is set up as part of the store’s middleware chain, it intercepts all actions
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middlewareLogger),
});

// Usage of dispatching MIDDLEWARE/REGISTER action
store.dispatch(registerMiddlewareAction(middleware));
```

### Snippets

```jsx
// dynamically loading reducers
// useful when you have a large application and don't want to load all the reducers upfront, but only when needed
// when a particular page or feature is accessed
// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Set up initial reducers (for example, an authReducer loaded at the start)
const staticReducers = {
	auth: authReducer,
};

// A helper function to create a root reducer that includes all reducers
function createReducer(reducers) {
	return combineReducers(reducers);
}

// Create the store with the initial static reducers
export const createReduxStore = () => {
	const store = createStore(
		createReducer(staticReducers),
		applyMiddleware(thunk)
	);

	// Add a new object to keep track and hold dynamically loaded reducers
	store.asyncReducers = {};

	// Helper function to add new reducers at runtime
	store.injectReducer = (key, asyncReducer) => {
		store.asyncReducers[key] = asyncReducer;
		// store.replaceReducer: replaces the current root reducer with a new one.
		store.replaceReducer(
			createReducer({ ...staticReducers, ...store.asyncReducers })
		);
	};

	return store;
};

// export the store
export const store = createReduxStore();

// inject the reducer when the component is loaded
// ProductPage.js
import { useDispatch, useStore } from 'react-redux';
import productReducer from './reducers/productReducer';
import { fetchProductsFromAPI } from './actions/productActions';

const ProductPage = () => {
	const dispatch = useDispatch();
	const store = useStore();

	useEffect(() => {
		// Check if the product reducer is already added, if not, inject it
		if (!store.asyncReducers.product) {
			store.injectReducer('product', productReducer);
		}

		// Now you can dispatch actions related to the dynamically loaded reducer
		dispatch(fetchProductsFromAPI());
	}, [dispatch, store]);

	return <h1>Products</h1>;
};

// Using extraReducers to Handle Actions from Other Slices
// extraReducers allows a slice to listen for actions from other slices
// which is helpful if you have actions in one slice that should also affect the state of another slice
// authSlice.js
const authSlice = createSlice({
	name: 'auth',
	initialState: {},
	reducers: {
		login: (state, action) => {},
		logout: (state) => {},
	},
});

export const { login, logout } = authSlice.actions;

// Use extraReducers to Listen for logout from the other slice
// cartSlice.js
import { logout } from './authSlice'; // Import the logout action from authSlice

const cartSlice = createSlice({
	name: 'cart',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		// Clear the cart when logout is dispatched
		builder.addCase(logout, (state) => {
			state.items = [];
		});
	},
});

// Additional Example: Multiple Slices Responding to fetchProducts
// code in productsSlice
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await fetch('https://fakestoreapi.com/products');
		return response.json();
	}
);

// using the async function in the other slice to track the status
// code in statusSlice
import { fetchProducts } from './productsSlice';

const statusSlice = createSlice({
	name: 'status',
	initialState: {
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true; // Set loading to true when fetching starts
			})
			.addCase(fetchProducts.fulfilled, (state) => {
				state.isLoading = false; // Set loading to false on successful fetch
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.isLoading = false; // Set loading to false on failure
			});
	},
});

// another example of using actions from other reducer using core redux
// actions/authActions.js
export const LOGOUT = 'LOGOUT';

export const logout = () => ({
	type: LOGOUT,
});

// reducers/cartReducer.js
import { LOGOUT } from '../actions/authActions';

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		// using action from other reducer
		case LOGOUT:
			return {
				...state,
				items: [],
			};
		default:
			return state;
	}
}

// multiple async actions
// fetching and validation of product stocks
// Sample JSON response for stock verification
{
	"productId": "123",
	"availableStock": 3,
	"success": true,
	"message": "Purchase successful"
}

// Thunk for fetching product data, including available stock
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await fetch('/api/products');
		const data = await response.json();
		return data; // List of products with stock info
	}
);

// Thunk for attempting a purchase
export const purchaseProduct = createAsyncThunk(
	'products/purchaseProduct',
	async (productId) => {
		const response = await fetch(`/api/purchase/${productId}`, {
			method: 'POST',
		});
		const data = await response.json();
		return { productId, ...data };
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(purchaseProduct.fulfilled, (state, action) => {
				const { productId, availableStock } = action.payload;
				// Update stock based on backend response
				const product = state.items.find(
					(item) => item.id === productId
				);
				if (product) {
					product.stock = availableStock;
				}
			});
	},
});

```

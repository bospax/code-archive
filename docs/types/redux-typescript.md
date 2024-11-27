# Redux + TypeScript

### Types for Redux Core

```tsx
// adding types with redux actions, state and reducers
// creating actions with types
type CounterActionType = 'INCREMENT' | 'DECREMENT';

export interface CounterAction {
	type: CounterActionType;
}

export const increment = (): CounterAction => ({
	type: 'INCREMENT',
});

export const decrement = (): CounterAction => ({
	type: 'DECREMENT',
});

// creating the reducer with types
export interface CounterState {
	count: number;
}

const initialState: CounterState = { count: 0 };

export const counterReducer = (
	state = initialState,
	action: CounterAction
): CounterState => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + 1 };
		case 'DECREMENT':
			return { count: state.count - 1 };
		default:
			return state;
	}
};

// creating the store
// Create the store with the reducer
const store = createStore(counterReducer);

// creating a type for the entire state tree
// structure 1:
export type RootState = ReturnType<typeof store.getState>;

export default store;

// structure 2:
// defining the return type using the root reducer
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

// providing the store
<StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
</StrictMode>;

// accessing the store and dispatching actions with types
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, CounterAction } from './actions';
import { RootState } from './store';
import { Dispatch } from 'redux';

function App() {
	const count = useSelector((state: RootState) => state.count); // using the RootState type definition
	const dispatch: Dispatch<CounterAction> = useDispatch(); // defining type for the dispatch actions

	return (
		<>
			<div>React Redux: {count}</div>
			<button onClick={() => dispatch(increment())}>Increase</button>
			<button onClick={() => dispatch(decrement())}>Decrease</button>
		</>
	);
}
```

### Types for Dynamic Reducers

```tsx
// giving types to a redux custom dynamic reducers
// store.ts
import {
	createStore,
	combineReducers,
	applyMiddleware,
	Reducer,
	AnyAction,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { authReducer } from './reducers/authReducer'; // Assuming you have an authReducer file

// Define the shape of your store's state
interface RootState {
	auth: ReturnType<typeof authReducer>; // Infer the type from the authReducer
	[key: string]: any; // For dynamically added reducers, where the key is unknown at the start
}

// Type for your static reducers
const staticReducers: Record<string, Reducer> = {
	auth: authReducer,
};

// A helper function to create a root reducer that includes all reducers
function createReducer(reducers: Record<string, Reducer>): Reducer<RootState> {
	return combineReducers(reducers);
}

// Extend the Redux Store type to add asyncReducers and injectReducer
// we extend ReturnType<typeof createStore> to get the return structure of createStore()
// and we want to add additional properties (asyncReducers, injectReducer) to that returned store object
export interface StoreWithAsyncReducers extends ReturnType<typeof createStore> {
	asyncReducers: Record<string, Reducer>;
	injectReducer: (key: string, asyncReducer: Reducer) => void;
}

// Create the store with the initial static reducers
export const createReduxStore = () => {
	// Define the Redux store with asyncReducers and injectReducer function
	const store = createStore(
		createReducer(staticReducers),
		applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
	) as StoreWithAsyncReducers;

	// Initialize asyncReducers
	store.asyncReducers = {};

	// Function to inject new reducers at runtime
	store.injectReducer = (key: string, asyncReducer: Reducer) => {
		store.asyncReducers[key] = asyncReducer;
		store.replaceReducer(
			createReducer({ ...staticReducers, ...store.asyncReducers })
		);
	};

	return store;
};
```

### Types for Redux Thunk

```tsx
// actionTypes.ts
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST' as const;
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS' as const;
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE' as const;

export type FetchProductsRequestAction = {
	type: typeof FETCH_PRODUCTS_REQUEST;
};

export type FetchProductsSuccessAction = {
	type: typeof FETCH_PRODUCTS_SUCCESS;
	payload: Product[];
};

export type FetchProductsFailureAction = {
	type: typeof FETCH_PRODUCTS_FAILURE;
	payload: string;
};

export type ProductActionTypes =
	| FetchProductsRequestAction
	| FetchProductsSuccessAction
	| FetchProductsFailureAction;

// types.ts
export interface Product {
	id: number;
	title: string;
	// Add any other fields that the API response might have
}

// reducers/productReducer.ts
import {
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	ProductActionTypes,
} from '../actions/actionTypes';
import { Product } from '../types';

interface ProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
};

export const productReducer = (
	state = initialState,
	action: ProductActionTypes
): ProductState => {};

// typing action creators
// actions.ts
import {
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	FetchProductsRequestAction,
	FetchProductsSuccessAction,
	FetchProductsFailureAction,
} from './actionTypes';
import { Product } from '../types';
import { Dispatch } from 'redux';

export const fetchProductsRequest = (): FetchProductsRequestAction => ({
	type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (
	products: Product[]
): FetchProductsSuccessAction => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: products,
});

export const fetchProductsFailure = (
	error: string
): FetchProductsFailureAction => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: error,
});

// Thunk action
export const fetchProducts = () => {
	return async (dispatch: Dispatch<ProductActionTypes>) => {
		dispatch(fetchProductsRequest());
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data: Product[] = await response.json();
			dispatch(fetchProductsSuccess(data));
		} catch (error) {
			dispatch(fetchProductsFailure(error.message));
		}
	};
};

// typing the root state from root reducer
// reducers/index.ts
export const rootReducer = combineReducers({
	products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// typing the store
// store.ts
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export default store;

// typing the dispatch and selector
function App() {
	const dispatch: AppDispatch = useDispatch();
	const products = useSelector((state: RootState) => state.products.products);

	useEffect(() => {
		dispatch(fetchProductsFromAPI());
	}, [dispatch]);
}
```

### Types for Redux Toolkit

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
	id: number;
	name: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

// PayloadAction<> - used to define the type of the payload that an action carries in Redux
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

interface Product {
	id: number;
	title: string;
	price: number;
}

interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	products: [],
	loading: false,
	error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
	'products/fetchProducts',
	async () => {
		const response = await fetch('https://fakestoreapi.com/products');
		if (!response.ok) throw new Error('Failed to fetch products');
		return response.json();
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.products = action.payload;
					state.loading = false;
				}
			)
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.error.message ?? 'Something went wrong';
				state.loading = false;
			});
	},
});

export default productsSlice.reducer;

interface CartItem extends Product {
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) {
				item.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload.id
			);
		},
	},
});

// creating the type RootState
const rootReducer = combineReducers({
	auth: authReducer,
	products: productsReducer,
	cart: cartReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Types for Asynchronous Functions

```tsx
// 1. Triggering Multiple Synchronous Actions
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product type
interface Product {
	id: number;
	name: string;
	price: number;
	onSale?: boolean; // Optional field for sale items
}

// Define the state type for the products slice
interface ProductsState {
	items: Product[];
	loading: boolean;
	error: string | null;
	fetchedTimestamp: string | null;
}

// Initial state with type
const initialState: ProductsState = {
	items: [],
	loading: false,
	error: null,
	fetchedTimestamp: null,
};

// typing the asynchronous action
// syntax:
createAsyncThunk<ReturnedType, ArgumentType, ThunkAPIOptions>(...)

// ReturnedType — the type of the value that will be returned when the async action is successful.
// Here, Product[] indicates that this function will return an array of Product items

// ArgumentType — the type of any argument the thunk function might expect.
// Since we’re using void here, this action doesn’t take any argument when called (e.g., dispatch(fetchProducts()) without parameters)

// { rejectValue: string }: This is the ThunkAPIOptions, allowing you to customize the thunk's behavior
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>()

// Define the Thunk for fetching products
export const fetchProducts = createAsyncThunk<
	Product[],
	void,
	{ rejectValue: string }
>('products/fetchProducts', async (payload, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading()); // Custom action to show loading state

		const response = await axios.get<Product[]>('/api/products'); // Ensure the response is an array of Product

		dispatch(setProducts(response.data)); // Dispatches the data after fetching
		dispatch(setFetchedTimestamp(new Date().toISOString())); // Record fetch time

		return response.data;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		dispatch(setError(errorMessage)); // Handle errors with message
		return rejectWithValue(errorMessage);
	}
});

// Create the products slice
const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.items = action.payload;
			state.loading = false;
		},
		setFetchedTimestamp: (state, action: PayloadAction<string>) => {
			state.fetchedTimestamp = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
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
			state.error = action.payload || 'Failed to fetch products';
		});
	},
});

export const { setLoading, setProducts, setFetchedTimestamp, setError } =
	productsSlice.actions;
export default productsSlice.reducer;

// 2. Triggering Multiple Async Actions Sequentially
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define type for individual product details
interface ProductDetail {
	id: number;
	details: {
		description: string;
		features: string[];
	};
}

// Define state for product details slice
interface ProductDetailsState {
	[id: number]: ProductDetail['details'] | undefined;
}

// Define the Thunk for fetching product details
export const fetchProductDetails = createAsyncThunk<
	ProductDetail,
	number,
	{ rejectValue: string }
>('products/fetchProductDetails', async (productId, { rejectWithValue }) => {
	try {
		const response = await axios.get(`/api/products/${productId}`);
		return { id: productId, details: response.data };
	} catch (error) {
		return rejectWithValue('Failed to fetch product details');
	}
});

// void as ReturnedType: This function does not return a value upon success
// void as ArgumentType: Since the function doesn’t expect any argument
// No third argument is provided, rejectWithValue() defaults to unknown if used
export const fetchProductsAndDetails = createAsyncThunk<void, void>()

export const fetchProductsAndDetails = createAsyncThunk<void, void>(
	'products/fetchProductsAndDetails',
	async (_, { dispatch }) => {
		const response = await dispatch(fetchProducts());

		if (fetchProducts.fulfilled.match(response)) {
			const productIds = response.payload.map((product) => product.id);
			await Promise.all(
				productIds.map((id) => dispatch(fetchProductDetails(id)))
			);
		}
	}
);

// Create product details slice
const productDetailsSlice = createSlice({
	name: 'productDetails',
	initialState: {} as ProductDetailsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchProductDetails.fulfilled,
			(state, action: PayloadAction<ProductDetail>) => {
				const { id, details } = action.payload;
				state[id] = details; // Saves details by product ID
			}
		);
	},
});

export default productDetailsSlice.reducer;

// 3. Combining Synchronous and Async Actions Conditionally
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Products slice state definition
interface ProductsState {
	items: Product[];
	loading: boolean;
	error: string | null;
}

// Define the Thunk with conditional dispatch for product details
export const fetchProductsWithConditionalDetails = createAsyncThunk<
	void,
	void,
	{ rejectValue: string }
>(
	'products/fetchProductsWithConditionalDetails',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading(true));

			const response = await axios.get<Product[]>('/api/products');
			const products = response.data;
			dispatch(setProducts(products));

			const saleProductIds = products
				.filter((p) => p.onSale)
				.map((p) => p.id);

			if (saleProductIds.length) {
				await Promise.all(
					saleProductIds.map((id) =>
						dispatch(fetchProductDetails(id))
					)
				);
			}

			dispatch(setLoading(false));
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error';
			dispatch(setError(errorMessage));
			dispatch(setLoading(false));
			return rejectWithValue(errorMessage);
		}
	}
);

// Define products slice
const productsSlice = createSlice({
	name: 'products',
	initialState: {
		items: [],
		loading: false,
		error: null,
	} as ProductsState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.items = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const { setLoading, setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;
```

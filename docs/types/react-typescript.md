# React + TypeScript

`npm create vite@latest my-vite-app -- --template react-ts`

### Type Definition

```tsx
// adding types to props using type alias
type GreetingProps = {
	name: string;
};

const Greeting = ({ name }: GreetingProps) => {
	return <h2>Hello, {name}!</h2>;
};

type UserProps = {
	name: string;
	age: number;
};

const UserProfile = ({ name, age }: UserProps) => {};
```

```tsx
// adding types to states
const [count, setCount] = useState<type>(0);
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
```

```tsx
// adding types to events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	console.log('Button clicked', event);
};

<button onClick={handleClick}>Click me</button>;

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	console.log(event.target.value);
};

<input type="text" onChange={handleChange} />;
```

```tsx
// using union types to restrict variable value
type Status = 'success' | 'error' | 'loading';

const StatusMessage = ({ status }: { status: Status }) => {};
```

```tsx
// using type and interface together
type Status = 'success' | 'error' | 'loading';

interface StatusMessageProps {
	status: Status;
}

const StatusMessage = ({ status }: StatusMessageProps) => {};
```

### Typing Concepts

```tsx
// example #1: defining types in context api
type AuthContextType = {
	user: string;
	login: (user: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = React.useState<string>('');

	const login = (newUser: string) => setUser(newUser);

	return (
		<AuthContext.Provider value={{ user, login }}>
			{children}
		</AuthContext.Provider>
	);
};
```

```tsx
// example #2: defining types in context api
type Theme = 'light' | 'dark';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light');

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
```

```tsx
// example #3: defining types in context api
export interface User {
	name: string;
	age: number;
	isMarried: boolean;
}

interface UserContextType {
	users: User[] | null;
	addUser: (user: User) => void;
	updateUser: (id: string | number) => void;
	deleteUser: (id: string | number) => void;
}

const contextInitialValues = {
	users: null,
	addUser: () => null,
	updateUser: () => null,
	deleteUser: () => null,
};

export const UserContext = createContext<UserContextType>(contextInitialValues);

interface Props {
	children: React.ReactNode;
}

export const UserProvider = (props: Props) => {
	const [users, setUsers] = useState<User[] | null>(null);

	useEffect(() => {
		setUsers([{ name: 'pedro', age: 22, isMarried: false }]);
	}, []);

	const addUser = (user: User) => null;
	const updateUser = (id: string | number) => null;
	const deleteUser = (id: string | number) => null;

	return (
		<UserContext.Provider
			value={{ users, addUser, updateUser, deleteUser }}
		>
			{props.children}
		</UserContext.Provider>
	);
};
```

```tsx
// creating generics
// useful for creating reusable component with flexible type
// ListProps<T>: This is a generic type definition. The T in angle brackets is a placeholder for any type.
// items: T[]: This indicates that items is an array of elements of type T.
// render: (item: T) => JSX.Element: This defines a function render that takes an item of type T and returns a JSX element. This allows you to customize how each item is rendered.
type ListProps<T> = {
	items: T[];
	render: (item: T) => JSX.Element;
};
```

```tsx
// <T,>: This syntax declares that the List component is generic
const List = <T,>({ items, render }: ListProps<T>) => {
	return (
		<ul>
			{items.map((item, index) => (
				<li key={index}>{render(item)}</li>
			))}
		</ul>
	);
};

const items = ['Apple', 'Banana', 'Cherry'];
```

```tsx
// Using the List Component with Different Types
const App = () => {
	const fruits = ['Apple', 'Banana', 'Cherry'];
	const numbers = [1, 2, 3];

	return (
		<div>
			<h2>Fruits:</h2>
			<List
				items={fruits}
				render={(fruit) => <span>{fruit}</span>} // T is inferred as string
			/>

			<h2>Numbers:</h2>
			<List<number>
				items={numbers}
				render={(number) => <strong>{number}</strong>} // T is explicitly set as number
			/>
		</div>
	);
};
```

```tsx
// custom hooks with default value and type
function useToggle(initialState: boolean = false) {
	const [state, setState] = useState(initialState);

	const toggle = () => setState((prev) => !prev);

	return [state, toggle] as const;
}
```

```tsx
// defining types for higher order components (HOC)
const withBorder = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	return (props: P) => (
		<div>
			<WrappedComponent {...props} />
		</div>
	);
};

const SimpleComponent = ({ message }: { message: string }) => {
	return <p>{message}</p>;
};

const EnhancedComponent = withBorder(SimpleComponent);

const App = () => {
	return (
		<div>
			<EnhancedComponent message="Hello, I am inside a bordered component!" />
		</div>
	);
};
```

# TypeScript

### Configuration

```ts
// installing TypeScript globally means you can use the tsc (TypeScript compiler) command in any project
npm install -g typescript

// verify the installation by checking the version
tsc --version

// installing typescript in single project
// initialize project with package.json
// creates a package.json file where all your dependencies will be listed
npm init -y

// install TypeScript locally as a development dependency
npm install typescript --save-dev

// test installation by creating simple typescript file
touch index.ts

// method: 1 make the file a module to avoid variable naming conflicts
export {};
let name: string = 'hello';
console.log(name);

// method: 2 use namespace to avoid variable naming conflicts
namespace MyApp {
    let name: string = 'hello';
    console.log(name);
}

// compile typescript file into javascript file
tsc index.ts // if globally installed

npx tsc index.ts // if locally installed

// run the js file
node index.js

// setting up a tsconfig for automating compilation
// generate a tsconfig.json file
tsc --init

// configuration inside the tsconfig.json file
{
	"compilerOptions": {
		"target": "ES6",                 // JavaScript version to compile to (ES6/ES2015)
		"module": "commonjs",             // Module system for Node.js
		"strict": true,                   // Enables all strict type-checking options
		"outDir": "./dist",               // Output directory for compiled JavaScript files
		"esModuleInterop": true           // Allows better interoperability with CommonJS modules
	},
	"include": ["src/**/*"],             // Compile all files in the src folder
	"exclude": ["node_modules"]          // Exclude the node_modules folder
}

// compile with tsconfig
tsc // for global
npx tsc // for local

// sample file structure
/typescript-sandbox
├── src
│   ├── index.ts
├── dist
├── node_modules
└── tsconfig.json

// auto re-compile projects for every changes
tsc --watch
npx tsc --watch
```

### Fundamentals & Concepts

```ts
// variables, parameters, and return values can have specific types
// defining array types by 2 syntaxes
let fruits: string[] = ['Apple', 'Banana']; // type[] syntax
let numbers: Array<number> = [1, 2, 3]; // Array<type> syntax

// string
let name: string = 'John';
let names: string[];
let strings: string[] = ['Apple', 'Banana'];
let names: Array<string>;

// number
let age: number = 23;
let ages: number[];
let numbers: number[] = [1, 2, 3];
let ages: Array<number>;
let numbers: Array<number> = [4, 5, 6];
let strings: Array<string> = ['Cherry', 'Date'];

// boolean
let isDeveloper: boolean = true;
let isActive: boolean[];
let isActive: Array<boolean>;
let booleans: boolean[] = [true, false];
let booleans: Array<boolean> = [true, false];

// undefined
let values: undefined[];
let values: Array<undefined>;

// null
let empty: null[];
let empty: Array<null>;

// symbol
let symbols: symbol[];
let symbols: Array<symbol>;

// bigInt
let bigInts: bigint[];
let bigInts: Array<bigint>;

// any
let items: any[];
let items: Array<any>;

// unknown
let unknownItems: unknown[];
let unknownItems: Array<unknown>;

// objects
let object: { name: string; age: number };
let object: { name: string; age: number } = { name: 'John', age: 25 };

// array of objects
let users: { name: string; age: number }[];
let users: Array<{ name: string; age: number }>;

let users: { name: string; age: number }[] = [
	{ name: 'Alice', age: 25 },
	{ name: 'Bob', age: 30 },
];

let users: Array<{ name: string; age: number }> = [
	{ name: 'Charlie', age: 35 },
	{ name: 'Dave', age: 40 },
];

// nested arrays
let matrix: number[][];
let matrix: Array<Array<number>>;

let nestedArray: number[][] = [
	[1, 2, 3],
	[4, 5, 6],
];

let nestedArray: Array<Array<number>> = [
	[7, 8, 9],
	[10, 11, 12],
];

// defining type for tuples
// tuples are special array that have fixed length and fixed data type values
let user: [string, number] = ['Alice', 25];
let point: [number, number][];
let points: Array<[number, number]>;

// function
// defining type in a function with parameters and return types
function add(a: number, b: number): number {
	return a + b;
}

const add = (a: number, b: number): number => {
	return a + b;
};

const add = (a: number, b: number): number => a + b;

// giving default parameters
function greet(name: string, greeting: string = 'Hello'): string {
	return `${greeting}, ${name}`;
}

const greet = (name: string, greeting: string = 'Hello'): string => {
	return `${greeting}, ${name}`;
};

const greet = (name: string, greeting: string = 'Hello'): string =>
	`${greeting}, ${name}`;

// function type alias
// useful when you want to reuse specific function type
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;
const subtract: AddFunction = (a, b) => a - b;

// complex function signature
// defining types for function returning a function
type GreetFunction = (greeting: string) => (name: string) => string;

const createGreeter: GreetFunction = (greeting) => (name) => {
	return `${greeting}, ${name}!`;
};

const sayHello = createGreeter('Hello');
console.log(sayHello('Alice')); // Output: "Hello, Alice!"

// defining types for function taking a callback
type Logger = (message: string) => void;
type ProcessFunction = (value: number, callback: Logger) => void;

const processValue: ProcessFunction = (value, callback) => {
	if (value > 10) {
		callback(`Value is too high: ${value}`);
	}
};

processValue(15, (message) => console.log(message)); // Output: "Value is too high: 15"

// defining types for a higher order functions
type Transform = (value: number) => number;
type HigherOrderFunction = (fn: Transform) => Transform;

const double: Transform = (value) => value * 2;

// HigherOrderFunction is a type alias for a function that takes a Transform function and returns another Transform
// applyTwice is a higher-order function that applies the fn function twice to the value
const applyTwice: HigherOrderFunction = (fn) => (value) => fn(value);

console.log(applyTwice(double)(5)); // Output: 20

// indicate optional parameter by ? symbol
function add(a: number, b?: number): number {}

const addOptional = (a: number, b?: number): number => {
	return b !== undefined ? a + b : a; // handling the optional parameter
};

type User = {
	name: string;
	age: number;
	isStudent?: boolean; // optional property
};

// Function Signatures with Optional and Default Parameters
type GreetWithOptional = (greeting: string, name?: string) => string;

const greet: GreetWithOptional = (greeting, name = 'stranger') => {
	return `${greeting}, ${name}!`;
};

console.log(greet('Hello')); // Output: "Hello, stranger!"
console.log(greet('Hello', 'Alice')); // Output: "Hello, Alice!"

// array of functions
let handlers: ((event: string) => void)[];
let handlers: Array<(event: string) => void>;

// defining enums and type
// enums/enumerations are a special data type that allows you to define a set of named constants
enum Status {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Pending = 'PENDING',
}

// giving type to enums
let currentStatus: Status = Status.Active;

enum Color {
	Red,
	Green,
	Blue,
}

let colors: Color[];

enum Color {
	Red,
	Green,
	Blue,
}

let colors: Array<Color>;

// enums will implicitly assign a default numeric value if do not have one
enum Fruit {
	Apple, // 0
	Banana, // 1
	Cherry, // 2
	Date, // 3
}

let myFruit: Fruit = Fruit.Banana;

// defining starting point of enum
enum Vegetable {
	Carrot = 5, // 5
	Potato, // 6
	Onion, // 7
}

// will result in error if starting value is a string and others are not
enum Vegetable {
	Carrot = 'CARROT',
	Potato, // Error: Enum member must have initializer.
	Onion, // Error: Enum member must have initializer.
}

// union types
// defining multiple types for a variable
let id: string | number;
id = 'abc';
id = 123;

// complex array that can have multiple types
let array: (string | number | { age: number; address: string } | number[])[];

let array: (string | number | { age: number; address: string } | number[])[] = [
	'john',
	5,
	{ age: 24, address: 'some street' },
	[1, 2, 3, 4],
];

// defining type alias
// use type to define complex type definitions
// creating custom types using the 'type' alias
type ID = string | number;

let userId: ID = 123;

// best practice for this is to use an interface
type UserType = {
	name: string;
	age: number;
	greet(): void;
};

type Logger = (message: string) => void;

const logUser: Logger = (message) => {
	console.log(message);
};

// type querying
// typeof is used in a type position (often to get the type of an object, function, or variable)
const person = {
	name: 'Alice',
	age: 25,
};

// Using `typeof` to create a type that matches the structure of `person`
type Person = typeof person; // { name: string; age: number }
```

### Advanced Concept & Typing

```ts
// Interfaces define the structure of an object or a contract for a class.
interface User {
	name: string;
	age: number;
	greet(): void;
}

// extending an interface
interface Employee extends User {
    employeeId: number;
}

let user: User = {
	name: 'John',
	age: 30,
	greet() {
		console.log(`Hello, I’m ${this.name}`);
	},
};

// interface with same name will be merged
interface User {
    name: string;
}

interface User {
    age: number;
}

// resulting merged interface will be:
interface User {
    name: string;
    age: number;
}

// using interface to define deep nested array structures
const skillset = [
	{
		category: 'FrontEnd',
		techs: [
			{
				id: 5,
				name: 'React',
				image: ''
			},
			{
				id: 6,
				name: 'Vue',
				image: ''
			},
		]
	}
]

// structure 1: using bracket notation
interface Tech {
    id: number;
    name: string;
    image?: string;
}

interface SkillSetProps {
    skillset: {
        category: string;
        techs: Tech[];
    }[]; // [] bracket means data structure will be an array of objects
}

// structure 2: separate interface definition
interface Tech {
	id: number;
	name: string;
	image?: string;
}

interface SkillSet {
	category: string;
	techs: Tech[];
}

interface SkillSetProps {
	skillset: SkillSet[];
}

// using the definition:
const SkillSet = ({ skillset }: SkillSetProps) => {}

// intersection types
// intersection types allow you to combine multiple types into one
// the resulting type must satisfy all the constraints of the combined types
interface User {
	name: string;
	age: number;
}

interface Employee {
  	employeeId: number;
}

type EmployeeUser = User & Employee;

const john: EmployeeUser = {
	name: "John",
	age: 30,
	employeeId: 12345,
};

// using intersection for functions
type Loggable = {
  	log: (message: string) => void;
}

type Savable = {
  	save: () => void;
}

type LoggerAndSaver = Loggable & Savable;

const loggerSaver: LoggerAndSaver = {
	log: (message: string) => {
		console.log(message);
	},
	save: () => {
		console.log("Saving...");
	},
}

loggerSaver.log("Logging data...");
loggerSaver.save();

// index signature
// means that an object can have any number of properties of specified types
// syntax:
[placeholderName: keyType]: valueType

// 'key' - keyword is just a placeholder name representing the type of keys in the object
interface User {
	// This means key is a string, and the value can be of type any
  	[key: string]: any;
}

const user: User = {
	name: 'Alice',
	age: 30,
	isActive: true,
};

// using index signature for objects that has not been created
// useful for defining object structure
interface ProductDetail {
	id: number;
	details: {
		description: string;
		features: string[];
	};
}

interface ProductDetailsState {
  	[id: number]: ProductDetail['details'];
}

{
	initialState: {} as ProductDetailsState
}

// save details for each id
initialState[id] = details;

// another example of using index signature
interface UserProfile {
	name: string;
	age: number;
	email: string;
}

interface UserProfiles {
	[id: string]: UserProfile;
}

const users: UserProfiles = {
	user1: { name: "Alice", age: 30, email: "alice@example.com" },
	user2: { name: "Bob", age: 25, email: "bob@example.com" },
};

// generics
// allows writing reusable functions that work with any data type
function identity<T>(value: T): T {
	return value;
}

console.log(identity<string>('Hello'));
console.log(identity<number>(123));

// generics with function signature
// allow you to create reusable function signatures that work with different types
type IdentityFunction<T> = (arg: T) => T;

const identity: IdentityFunction<number> = (arg) => arg;
const stringIdentity: IdentityFunction<string> = (arg) => arg;

console.log(identity(42)); // Output: 42
console.log(stringIdentity("hello")); // Output: "hello"

// generics with constraints
// you may want to restrict the types a function can accept by using type constraints
type Lengthy = { length: number };

// T extends Lengthy restricts T to types that have a length property (like arrays or strings)
function logLength<T extends Lengthy>(item: T): void {
  	console.log(item.length);
}

// logLength function can now accept any type that satisfies the constraint (Lengthy),
// meaning it must have a length property
logLength([1, 2, 3]); // Output: 3
logLength("hello");   // Output: 5

// custom generic with multiple types
type Pair<T, U> = [T, U];

const stringNumberPair: Pair<string, number> = ['Alice', 30];

// custom generic with multiple types as a function
function pair<T, U>(first: T, second: U): [T, U] {
  	return [first, second];
}

let stringNumberPair = pair<string, number>("hello", 123);
console.log(stringNumberPair); // Output: ["hello", 123]

// generic array function
function getFirstElement<T>(arr: T[]): T {
  	return arr[0];
}

let firstNumber = getFirstElement([1, 2, 3]);  // Inferred as number
let firstString = getFirstElement(["a", "b", "c"]);  // Inferred as string

// generic constraints
// restrict the types that can be used in a generic function
// an example where T must have a length property:
interface HasLength {
  	length: number;
}

function logLength<T extends HasLength>(value: T): void {
  	console.log(value.length);
}

logLength("Hello");  // Works, since string has a length
logLength([1, 2, 3]);  // Works, arrays have a length
logLength({ length: 10 });  // Works, object has a length property
// logLength(123);  // Error: number doesn't have a length

// Type Assertion
// used when typescript cannot infer or determine the exact type of something
// used when you need to force TypeScript to treat a value as a certain type
// in this example: You are telling TypeScript that the result of document.querySelector('input')
// should be treated as an HTMLInputElement
// TypeScript can’t guarantee that document.querySelector() will return an input element, so we use as to assert the type
const inputElement = document.querySelector('input') as HTMLInputElement;

// This code explicitly declares the variable user to have the type UserType
const user: UserType = getUser();

// in this case getUser() returns a UserType, even if TypeScript might not know this for sure
const user = getUser() as UserType;

// initializing an unknown type variable and then override it later using alias
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;

// Type Guards
// used to narrow down the type inside conditional blocks
function logId(id: string | number) {
	if (typeof id === 'string') {
		console.log(`ID is a string: ${id.toUpperCase()}`);
	} else {
		console.log(`ID is a number: ${id.toFixed(2)}`);
	}
}

// Conditional Types
// used for complex type inference
// allow you to choose different types based on a condition
// syntax:
// T: The type you want to check.
// U: The type you're comparing T to.
// X: The type that will be returned if the condition is true (i.e., if T extends U).
// Y: The type that will be returned if the condition is false.
T extends U ? X : Y;

type Check<T> = T extends string ? string : number;
let value: Check<string>; // value will be a string

// Type Mapping or Mapped Types
// type mapping is basically takes each property in an existing type and applies some transformation to it
// syntax:
// P is a placeholder for the property name.
// K is the set of properties (typically keyof is used to get all the keys of an existing type).
// T is the type for each property (you can transform the type here).
{
	[P in K]: T
}

// Record<Keys, Type>
// Record mapped type allows you to create an object type with specific keys and a specified type for each key’s value
type Fruit = 'apple' | 'banana' | 'orange';

let fruitStock: Record<Fruit, number> = {
	apple: 10,
	banana: 5,
	orange: 12,
};

let object: Record<string, any> = {}; // you can freely add properties.

// Using Record to create a type where keys are user IDs and values are UserProfile
interface UserProfile {
	name: string;
	age: number;
	email: string;
}

interface UserProfiles {
  	profiles: Record<string, UserProfile>;
}

const users: UserProfiles = {
	profiles: {
		user1: { name: "Alice", age: 30, email: "alice@example.com" },
		user2: { name: "Bob", age: 25, email: "bob@example.com" },
	},
};

// using record without a specific key for each entry
type UserProfileMap = Record<string, UserProfile>;

// Now you can use it as follows
const users: UserProfileMap = {
	user1: { name: "Alice", age: 30, email: "alice@example.com" },
	user2: { name: "Bob", age: 25, email: "bob@example.com" },
};

// Using Specific String Literal Types
// limit the keys to specific string literals, you can use a union type for K
type Status = 'active' | 'inactive' | 'pending';

interface UserStatus {
	// Each status maps to a boolean
  	// the status property can only have the keys 'active', 'inactive', or 'pending'
	status: Record<Status, boolean>;
}

const userStatus: UserStatus = {
	status: {
		active: true,
		inactive: false,
		pending: false,
	},
};

// complex array that can have multiple types and objects with flexible properties and nested array with multiple types
let array: (string | number | Record<string, any> | any[])[];

let array: (string | number | Record<string, any> | any[])[] = [
    'john',
    5,
    { age: 24, address: 'some street', hobby: 'reading' }, // Object with arbitrary properties
    [1, 'apple', true, { nestedKey: 'value' }] // Array with mixed types
];

// Partial<T>
// a mapped types that makes all properties optional

interface User {
	name: string;
	age: number;
}

const user: Partial<User> = { name: 'Alice' };

// Readonly<T>
// a mapped types that makes properties read-only and cannot be re-assigned
interface Person {
    name: string;
    age: number;
    address: string;
}

let readOnlyPerson: Readonly<Person> = {
    name: "John",
    age: 30,
    address: "123 Main St"
};

readOnlyPerson.age = 35;  // Error: Cannot assign to 'age' because it is a read-only property.

// Required<T>
// Required<Type> mapped type in TypeScript transforms all properties of an existing type to be required
type Required<Type>

// example: converting an interface with optional properties to be all required
interface Person {
	name: string;
	age?: number;
	address?: string;
}

type FullPerson = Required<Person>;

const person: FullPerson = {
  name: "John",
  age: 25,
  address: "123 Main St"
};

// ReturnType<typeof someFunction>
// ReturnType<T> is a utility type that extracts the return type of a function
// Dynamically infers the type that a function returns
function getUser() {
	return {
		id: 1,
		name: 'Alice',
		age: 30,
	};
}

// Use ReturnType to infer the type of the returned object
type UserType = ReturnType<typeof getUser>;

// The inferred type is:
type UserType = {
	id: number;
	name: string;
	age: number;
}

// you can also extends the return type of a function if you do not know the structure upfront
export interface StoreWithAsyncReducers extends ReturnType<typeof createStore> {
	asyncReducers: Record<string, Reducer>;
	injectReducer: (key: string, asyncReducer: Reducer) => void;
}

```

### Snippets

```tsx
// TypeScript with DOM Manipulation
const inputElement = document.querySelector('input') as HTMLInputElement;

inputElement.addEventListener('input', (e) => {
	console.log(inputElement.value);
});

// TypeScript with Promises and Async/Await
function fetchData(url: string): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('Data fetched from ' + url), 2000);
	});
}

async function getData(url: string): Promise<void> {
	let data = await fetchData(url);
	console.log(data);
}

getData('https://example.com');

// Creating custom mapped types
// Booleanify<T> is a mapped type that takes each property of T (which in this case is Person) and converts the property type to boolean
// example to convert all properties in Person to boolean values to represent whether those fields are valid
type Booleanify<T> = {
	[P in keyof T]: boolean;
};

interface Person {
	name: string;
	age: number;
	address: string;
}

type PersonBoolean = Booleanify<Person>;

let isValidPerson: PersonBoolean = {
	name: true,
	age: false,
	address: true,
};

// Deeply nested array custom type
type DeepNestedArray<T> = T | DeepNestedArray<T>[];

let deepArray: DeepNestedArray<number> = [[[1, 2, 3]]];
```

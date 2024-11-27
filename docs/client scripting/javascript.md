# JavaScript

### Variables & Data Types

```js
// - single line comment
/* this is a multi-line comment */
// javascript is case sensitive but not sensitive on whitespace or linebreaks
// js scripts runs from top to bottom

// declaring a variable
var myVariable;

// defining variable by giving them value
myVariable = 10;
myVariable = 'Hello';
/* js works in dynamic datatypes meaning type of variables may change
unlike in other pl that you need to specify its type */

// declaring variable using var, let, const
// var: Function-scoped, can be redeclared and reassigned, hoisted
// variables declared with var are limited to the function they’re defined in (or globally if outside any function)
function exampleVar() {
	console.log(a); // undefined (hoisting - variable exists but not yet assigned)

	var a = 10; // Declaration and assignment

	if (true) {
		var a = 20; // Same variable `a`, modified within this block
		console.log(a); // 20
	}

	console.log(a); // 20 (modification affected `a` in the whole function scope)
}

// let: Block-scoped, cannot be redeclared, can be reassigned, hoisted (in Temporal Dead Zone)
// variables declared with let are limited to the block { ... } they’re defined in
function exampleLet() {
	console.log(b); // ReferenceError (cannot access `b` before declaration)

	let b = 10;

	if (true) {
		let b = 20; // `b` inside this block is a different variable
		console.log(b); // 20 (block-scoped variable)
	}

	console.log(b); // 10 (outer `b` is unaffected by the inner block)
}

// const: Block-scoped, cannot be redeclared or reassigned, must be initialized, hoisted (in Temporal Dead Zone)
function exampleConst() {
	const c = 10;

	if (true) {
		const c = 20; // This `c` is only in the block scope
		console.log(c); // 20 (block-scoped constant)
	}

	console.log(c); // 10 (outer `c` is unaffected by the inner block)
}

// you cannot reassign a const variable, you can mutate its properties if it’s an object
const person = { name: 'John', age: 30 };

// Allowed: mutating the object properties
person.name = 'Jane';
console.log(person); // { name: "Jane", age: 30 }

// Not allowed: reassigning the `const` variable
person = { name: 'Doe', age: 25 }; // Error: Assignment to constant variable

// Temporal Dead Zone (TDZ) is a concept in JavaScript that applies to let and const declarations
console.log(a); // undefined - `var` is hoisted and initialized to `undefined`
console.log(e); // ReferenceError - `b` is in the Temporal Dead Zone
console.log(c); // ReferenceError - `c` is in the Temporal Dead Zone

var a = 10;
let e = 20;
const c = 30;

//declaring multiple variables
var myObj,
	i,
	x = '';

const screenWidth = 640,
	screenHeight = 480,
	gridSize = 32;
```

```js
// common operators
// = - assignment operator, + - * /
// note: = is an assignment operator while == is a comparison operator
// assigning 5 as the value of myVar
var myVar = 5;
// changing the value of myVar, now its value is 15
myVar = myVar + 10;

// concatenate using + operator
myVar = 5 + "hello!"; // result: "5hello!"

// shorthand notation for operator
myVar += 5; // taking the value of myVar and adding 5 to it, same as myVar = myVar + 5;
myVar++; // print out the value of a variable and add 1 to it
++myVar; // add 1 to a variable before it prints out the value of the variable

// printing out the value on the document
var myVar = "Oh Yeah!";
document.write(myVar); // result: "Oh Yeah!"

// printing out the value on the console
var myVar = "Oh Yeah!";
console.log(myVar); // result: "Oh Yeah!"

// boolean
// value that represents true or false
var myVar = true; // value of myVar is true
// note that boolean value are not string
7 = 7; // will give you an error because 7 is already 7 and you cannot use an assignment operator to this
7 == 7; // means 7 is equal to 7, value is true
7 == 5; // value is false

// evaluating value if it is true or false using Boolean function
Boolean();
Boolean(5 > 7); // value is false
Boolean(5); // value is true, because its a number
Boolean(0); // value is false, because the value of 0 is always false
Boolean("hello"); // value is true, because it has a value of string on it
Boolean(""); // value is false, because the string is empty

// 2 types in javascript
// primitive types:
let string = 'string';
let number = 30;
let boolean = false;
let undefinedValue;
let nullValue = null;

// reference types:
Object
Array
Function
```

### Conditions / Comparison Operator

```js
// control flow
// if statement
var youLikeMeat = true;

if (youLikeMeat) {
	// if the expression/condition is true the code will executed else it proceed to the next condition/else statement
	document.write('Here is the meaty menu');
}

const day = 'Monday';

if (day === 'Monday') {
	console.log('Start of the work week!');
} else if (day === 'Friday') {
	console.log('Almost the weekend!');
} else if (day === 'Saturday' || day === 'Sunday') {
	console.log('It’s the weekend!');
} else {
	console.log('Just another day.');
}
```

```js
// switch statement
// checks the value against multiple cases and executes the matching block of code
// break statement is used to exit the switch after a match is found
// default case handles any values that don't match the listed cases
const fruit = 'apple';

switch (fruit) {
	case 'apple':
		console.log('Apples are red or green.');
		break;
	case 'banana':
		console.log('Bananas are yellow.');
		break;
	case 'grape':
		console.log('Grapes can be red, green, or purple.');
		break;
	default:
		console.log('Unknown fruit.');
}

/*
> - greater than
< - less than
== - equal to, compare the value if they are equal
=== - triple equal, compare both value and datatype (e.g. string, integer) if they are equal
!= - not equal, negation operator
!== - not equal, both value and datatype
*/

// logical operator
/*
&& - and operator, both expression/condition should be true
|| - or operator, one condition should be true
*/
```

```js
// optional chaining operator
// allows you to safely access deeply nested properties on an object
user?.name; // user is not null or undefined, return user.name

// equivalent to
user && user.name;

// && - if left side expression is true, right side expression will be rendered
isLoggedIn && username;

// || - if left side expression is false, right side expression will be rendered or else will be ignored
username || 'Guest';

// ?? - nullish coalescing operator
// returns the right-hand operand when the left-hand operand is null or undefined
var result = value ?? 'Default Value';

// using !!
// double exclamation marks (!!) are used to coerce a value into a boolean
// convert assessment of a value in a 'true' or 'false' literal value
var error = '';

// if error is null, undefined, or another falsy value, !!error becomes 'false'
// if error is something like "Network Error", !!error will be 'true'
!!error;
```

### Loops

```js
// while loop
// while the condition is true it will loop and execute the code
var i = 5;
var sum = 0;

while (i <= 10) {
	document.write(i + '</br>');
	sum = i + sum; // take the value of sum and add the value of i

	i++; // add 1 to the variable each loop
	document.write(sum + '</br>');
}

// when the condition is false it will break out of the loop and execute the next line of statement
document.write(sum);

// for loop
// components: initialization, condition, iteration
for (i = 5; i <= 10; i++) {
	document.write(i);
}

// break and continue
for (i = 1; i <= 10; i++) {
	document.write(i);

	if (i === 7) {
		break; // break - broke out of the loop at a certain point
	}
}

for (i = 1; i <= 10; i++) {
	if (i === 5 || i === 3) {
		continue; // continue - broke out of the loop and continue to the next iteration
	}
	document.write(i);
}
```

```js
// for in loop
// used to iterate over the enumerable properties of an object
// Iterates over the keys of an object or the indices of an array
// key: This variable holds the name of the current property during each iteration.
// object: This is the object whose properties you want to iterate over.
const person = {
	name: 'Alice',
	age: 30,
	city: 'New York',
};

for (const key in person) {
	console.log(`${key}: ${person[key]}`);
	// Logs:
	// name: Alice
	// age: 30
	// city: New York
}

const nums = [10, 20, 30];

// Using for...in with an array
for (const index in nums) {
	console.log(`Index: ${index}, Value: ${nums[index]}`);
}
// Logs:
// Index: 0, Value: 10
// Index: 1, Value: 20
// Index: 2, Value: 30

// for of loop
// used to iterate over iterable objects in JavaScript.
// It provides a simple way to access each element in a collection (like an array, Set, Map, or even strings)
for (const element of iterable) {
	// Code to execute for each element
}

// element: This variable holds the value of the current element in the iteration.
// iterable: This is the collection you're iterating over, which can be an array, Set, Map, string, or other iterable objects
const mSet = new Set(['apple', 'banana', 'orange']);

for (const fruit of mSet) {
	console.log(fruit); // Logs 'apple', 'banana', and 'orange'
}

const numrs = [1, 2, 3, 4, 5];

for (const num of numrs) {
	console.log(num); // Logs 1, 2, 3, 4, 5
}
```

```js
// forEach
// the forEach() method calls a provided function once for each element in an array, in order
var numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
	console.log(num); // Output: 1, 2, 3, 4, 5
});

// syntax: array.forEach(function(currentValue, index, arr), thisValue)
var button = document.getElementsByTagName('button');
var element = document.getElementById('demo');
var numbers = [4, 9, 16, 25];

function myFunction(item, index) {
	element.innerHTML =
		element.innerHTML + 'index[' + index + ']: ' + item + '<br>';
}

button[0].onclick = function function_name() {
	numbers.forEach(myFunction);
};

// forEach loop and using query selector with arrow function
var links = document.querySelectorAll('nav a');
```

```js
// loops practical example
// javascript is zero (0) base, arrays and index always start at 0
var links = document.getElementsByTagName('a');
links.forEach((link) => link.classList.remove('active'));

for (i = 0; i <= links.length; i++) {
	document.write('link #' + i);
}

// appending classname to an element
var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	links[i].className = 'link-' + i;
}
```

### Functions / Pre-defined Functions

```js
// components: keyword (function), name of function, parameters/argument, code to execute
function getAverage(a, b) {
	var average = (a + b) / 2;
	document.write(average);
	return average; // return a value
}

getAverage(7, 12); // call the function, and pass the value to the function's parameters respectively

// IIFE - Immediately Invoked Function Expression
// imediately invoking a function right after definition
(function () {
	// Your code here
})();

(() => {
	// Your code here
})();

var result = getAverage(7, 12); // assigning the returned value of a function to a variable
document.write(result);

// variable scope
// determine the scope of variable where a certain code can use it
var myVar = 5; // global - variable at the top level of the js file

function myFunction(parameter) {
	var myVar = parameter; // local - variable define inside of a function, can only be use inside the function
}

// assigning function into a variable
const myFunction = function (parameter) {
	return parameter;
};

// call the function using the variable name
const result = myFunction('Hello, world!');
console.log(result); // output: Hello, world!

// setTimeout()
// setTimeout(), calling a function with specific time conditions
// parameters: function name, duration(time(ms) for the function to fire)
setTimeout(showMessage, 3000);

// setInterval()
var box = document.getElementById('box');
var colours = ['red', 'blue', 'yellow', 'pink', 'green'];
var i = 0;

function changeColor() {
	if (i < colours.length) {
		box.style.backgroundColor = colours[i];
		i++;
	} else {
		i = 0;
	}
}

// setInterval(), repeatedly calling a function with specific time conditions
setInterval(changeColor, 3000);

// note: add parenthesis to the function (changeColor()), if you want to pass the return value of the function to the setInterval's parameter
// clearTimeout() & clearInterval(), use to stop a timer
var interval = setInterval(changeColor, 3000); // store interval into a variable

// stop the timer when clicked
box.onclick = function () {
	clearInterval(interval);
	box.innerHTML = 'Timer Stopped!';
};
```

```js
// alert a string
alert('Hello World!');

// log a variable into the console
console.log(variable);

// get an object properties / methods
console.dir(document);

// return the last value in console
// special variable whose value is always equal to the result of the last operation in the console
$_;

// return the last selected element in console
$0;

// creating table in console
console.table([
	{
		name: 'John',
		email: 'john@email.com',
	},
	{
		name: 'Peter',
		email: 'peter@email.com',
	},
]);

// testing the speed of execution
console.time('For Loop');
for (let i = 0; i < 100; i++) {
	console.log(i);
}
console.timeEnd('For Loop');
```

```js
// put item in local storage
localStorage.setItem('key', 'value');

// get item in local storage
localStorage.getItem('key');

// remove item in local storage
localStorage.removeItem('key');

// get item from local storage and convert it from string to JSON format
const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

// set item to local storage and convert it from JSON to string
const saveTransactionsToLocalStorage = () => {
	localStorage.setItem('transactions', JSON.stringify(transactions.value));
};

// invoking the debugger in certain breakpoint
debugger;
```

```js
// accepts only number, hyphen and space
// 45 - hyphen, 32 - space
function isNumberKey(evt) {
	var charCode = evt.which ? evt.which : event.keyCode;

	console.log(charCode);

	if (
		charCode != 46 &&
		charCode != 45 &&
		charCode != 32 &&
		charCode > 31 &&
		(charCode < 48 || charCode > 57)
	) {
		return false;
	}
	return true;
}

// put this in html input
onkeypress = 'return isNumberKey(event);';

// checking of FormData() object values
for (var key of formData.entries()) {
	console.log(key[0] + ' => ' + key[1]);
}
```

```js
// arrow functions
// new ES6 syntax for functions
const foo = function (number) {
	return number * number;
};

const fooo = (number) => {
	// with one param
	return number * number;
};

const bar = () => {
	// no params
	return number * number;
};

// if the body of the functions has only one line and return a value
const barr = (number) => number * number;

// function currying
// Instead of passing all arguments to a function at once, you pass them one by one,
// with each call returning another function until all arguments have been provided
function add(a) {
	return function (b) {
		return function (c) {
			return a + b + c; // Return the sum of the three numbers
		};
	};
}

// using arrow function
const add = (a) => (b) => (c) => a + b + c;

// Using the curried function
var result = add(1)(2)(3); // Result is 6
console.log(result);

// Curried functions allow you to "partially apply" arguments and reuse functions with fewer arguments
const multiply = (a) => (b) => a * b;

const double = multiply(2); // Partially applied function

console.log(double(5)); // Outputs 10
console.log(double(10)); // Outputs 20
```

### String & Numbers

```js
// working with numbers
var a = 5; // number
var b = '5'; // string

// getting the type of a value
console.log(typeof (a + b));
console.log(Math.round(7.8));
// rounding a number using Math object
console.log(Math.max(7, 4, 9, 8));
// show the highest number

const value = 'Hello';
console.log(typeof value); // "string"

// NaN - (Not a Number)
// isNaN - function to check if a value is not a number
var a = 'apple';
var b = 5;

if (isNaN(a)) {
	console.log('that is not a number');
} else {
	console.log('that is a number');
}
```

```js
// strings
// quotation inside a string and escaping a string
var myString = 'I\'m a "fun" string';

console.log(myString.length); // getting the length of a string
console.log(myString.toUpperCase()); // make uppercase strings
console.log(myString.indexOf('string')); // counting the place of the string

var string1 = 'abc';
var string2 = 'bcd';

console.log(string1 < string2);
// alphabet have higher value in order (e.g. a < b)
// small letter have higher value than capital

// slice and split a strings
var str = 'hello, world!';
var str2 = str.slice(2, 9);
// slice the string in this case from position 2 to 9 (positioning start from 0 index)
// result: "llo, wo"

var str3 = str.slice(2);
// result: "llo, world"

// split - splitting a string and put the parts into arrays
var tags = 'meat,ham,salami,pork,beef,chicken'; // note: whitespaces affects the structure of arrays
var tagsArray = tags.split(','); // the parameter specify at what point to split the string (delimiter), in this case its comma ","
// everytime the split function see the delimiter it will split the string
// result: Array [ "meat", "ham", "salami", "pork", "beef", "chicken" ]

// concatination
// using + to concat two strings
const str = '<li>' + str + '</li>';

// using template literal
const str = `<li>${str}</li>`;
```

### Arrays

```js
// arrays - is a single variable that can hold a multiple values or can be multiple variables
var a = []; // creating empty array
var myArray = []; // creating an empty array

// inserting value inside the array by specifying in which index to store the value
// you can store multiple values with different types in the array
myArray[0] = 25; // store the value of 25 in 0 index of the array
myArray[1] = 35;
myArray[2] = true;
myArray[3] = 'hello';
myArray; // calling the array and all of its value

document.write(myArray);

// creating an array with its value
var myArray2 = [10, 20, 'hi', false];

// creating a new instance of the array() object
var myArray3 = new Array(5); // using the array object you can specify the size of the array
// note: arrays also have properties and methods like objects
myArray3.length; // size of the array, result is: 5, .length is a property that's why it doesn't parenthesis on it

// remove duplicates from arrays
var array = [...new Set(array)];

// spread operator
// spread use to produce a copy
// using spread to extract an array and combined into new array
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

var combined = arr1.concat(arr2); // old method
var combined = [...arr1, ...arr2]; // using spread operator
var combined = [...arr1, 'a', ...arr2, 'b']; // can also add another element directly

// using spread to make a copy of an object to preserve other properties
const initialState = {
	isAuthenticated: false,
	user: null,
	error: null,
	loading: false,
};

// spread the properties to preserve and overwrite other properties
const newState = {
	...initialState, // Copies the previous properties
	isAuthenticated: true, // Updates only the isAuthenticated property
	user: action.payload, // Updates only the user property
};
```

```js
// array methods
var array = ['apple', 'banana', 'orange'];

// push()
// - add an element in the end of the array list
array.push('grapes');

var newLength = array.push('corn', 'mango');

// pop()
// - remove the last element in the array and return its value
array.pop();

// shift()
// - removes the first element from an array and returns that element
var firstFruit = array.shift();

// unshift()
// - adds one or more elements to the beginning of an array and returns the new length of the array
var fruits = ['banana', 'orange'];
var newLength = fruits.unshift('apple');
console.log(fruits); // ['apple', 'banana', 'orange']
console.log(newLength); // 3

// concat()
// - Merges two or more arrays into a new array. The original arrays are not modified.
var arr1 = [1, 2];
var arr2 = [3, 4];
var mergedArray = arr1.concat(arr2);
console.log(mergedArray); // [1, 2, 3, 4]

// slice()
// returns a copy of a portion of an array into a new array
// selected from start to end (but end not included)
var fruits = ['apple', 'banana', 'orange', 'mango'];
var sliced = fruits.slice(1, 3); // from index 1 to (3 - 1)
console.log(sliced); // ['banana', 'orange']
console.log(fruits); // ['apple', 'banana', 'orange', 'mango'] (unchanged)

// splice()
// Adds, removes, or replaces elements in an array. It modifies the original array
array.splice(startIndex, deleteCount, item1, item2, itemN);

// find()
// Returns the first element in the array that satisfies the provided testing function
// If no elements satisfy the condition, undefined is returned
let numbers = [1, 2, 3, 4, 5];
let found = numbers.find((num) => num > 3);
console.log(found); // 4

// findIndex()
// Returns the index of the first element in the array that satisfies the provided testing function
// If no elements satisfy the condition, -1 is returned
let numbers = [1, 2, 3, 4, 5];
let foundIndex = numbers.findIndex((num) => num > 3);
console.log(foundIndex); // 3

// some()
// Tests whether at least one element in the array passes the test implemented by the provided function
// It returns true if it finds an element, and false otherwise
let numbers = [1, 2, 3, 4, 5];
let hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true

// every()
// Tests whether all elements in the array pass the test implemented by the provided function
// It returns true only if all elements pass the test
let numbers = [2, 4, 6];
let allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // true

// includes()
// Determines whether an array includes a certain value among its entries
// returning true or false as appropriate
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// join()
// Joins all elements of an array into a string
// separated by a specified separator (default is comma)
let fruits = ['apple', 'banana', 'orange'];
let joined = fruits.join(', ');
console.log(joined); // 'apple, banana, orange'

// reverse()
// Reverses the order of the elements in an array in place
// The first array element becomes the last, and the last becomes the first
let numbers = [1, 2, 3];
numbers.reverse();
console.log(numbers);

// sort()
// Sorts the elements of an array in place and returns the sorted array
let numbers = [10, 5, 40, 25];
numbers.sort((a, b) => a - b); // Sort in ascending order
console.log(numbers); // [5, 10, 25, 40]

// flat()
// Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
let nested = [1, [2, [3, [4]]]];
let flatArray = nested.flat(2); // Flatten up to depth 2
console.log(flatArray); // [1, 2, 3, [4]]

// flatMap()
// First maps each element using a mapping function, then flattens the result into a new array
let numbers = [1, 2, 3];
let flatMapped = numbers.flatMap((num) => [num, num * 2]);
console.log(flatMapped); // [1, 2, 2, 4, 3, 6]

// fill()
// modifies an array by filling it with a static value
// starting from a specified index and ending at another index (optional)
array.fill(value, start, end);

// value: The value to fill the array with.
// start (optional): The index at which to start filling (inclusive). If not provided, it defaults to 0 (the beginning of the array).
// end (optional): The index at which to stop filling (exclusive). If not provided, it defaults to the length of the array

let numbers = [1, 2, 3, 4];
numbers.fill(0, 1, 3); // Fills index 1 and 2 with 0
console.log(numbers); // [1, 0, 0, 4]

// toString()
// Returns a string representing the elements of the array
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits.toString()); // 'apple,banana,orange'

// Array.from()
// Creates a new array instance from an array-like or iterable object
var str = 'hello';
var arr = Array.from(str);
console.log(arr); // ['h', 'e', 'l', 'l', 'o']

// startIndex: The index at which to start changing the array.
// deleteCount: The number of elements to remove starting from startIndex. If 0, no elements are removed.
// item1, item2, ..., itemN (optional): The elements to add to the array starting from startIndex
// example 1:
let fruits = ['apple', 'mango'];
fruits.splice(1, 0, 'banana', 'orange'); // add at index 1
console.log(fruits); // ['apple', 'banana', 'orange', 'mango']

// Array.isArray()
// Determines whether the passed value is an array
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello')); // false

// example 2:
let fruits = ['apple', 'mango'];
fruits.splice(1, 2, 'banana', 'orange'); // Start at index 1, remove 2 elements, add 'banana' and 'orange'
console.log(fruits); // ['apple', 'banana', 'orange']

// example 3:
var fruits = ['apple', 'banana', 'orange', 'mango'];
var removed = fruits.splice(1, 2); // start at index 1, remove 2 elements
console.log(fruits); // ['apple', 'mango']
console.log(removed); // ['banana', 'orange']

// keys(), values(), entries()
let fruits = ['apple', 'banana', 'orange'];

// keys(): Returns a new array iterator object that contains the keys for each index.
let keys = fruits.keys();
console.log([...keys]); // [0, 1, 2]

// values(): Returns a new array iterator object that contains the values for each index.
let values = fruits.values();
console.log([...values]); // ['apple', 'banana', 'orange']

// entries(): Returns a new array iterator object that contains key-value pairs for each index.
let entries = fruits.entries();

for (let entry of entries) {
	console.log(entry);
}
```

```js
// copyWithin()
// used to copy a portion of an array to another location within the same array
// overwriting the existing values at the target location without modifying its length
array.copyWithin(target, start, end);

// target: The index at which to copy the sequence of elements to. This is where the copied elements will be placed.
// start (optional): The index at which to start copying elements from. This is where the copying begins. If not provided, the default is 0.
// end (optional): The index at which to stop copying elements (exclusive). If not provided, it defaults to the array's length.

// example 1:
let numbers = [1, 2, 3, 4, 5];
numbers.copyWithin(0, 3); // Copy elements starting at index 3 to index 0
console.log(numbers); // [4, 5, 3, 4, 5]

// example 2:
let arr = [1, 2, 3, 4, 5, 6];
arr.copyWithin(2, 0, 3); // Copy elements from index 0 to 3 (exclusive) to index 2
console.log(arr); // [1, 2, 1, 2, 3, 6]

// indexOf()
// Returns the first index at which a given element can be found in the array, or -1 if it is not present
var fruits = ['apple', 'banana', 'orange'];
var index = fruits.indexOf('banana');
console.log(index); // 1
console.log(fruits.indexOf('grape')); // -1 (not found)

// lastIndexOf()
// Returns the last index at which a given element can be found, or -1 if it is not present. Starts searching from the end of the array
var numbers = [1, 2, 3, 2, 1];
var index = numbers.lastIndexOf(2);
console.log(index); // 3 (last occurrence of 2)

// forEach()
// using foreach to iterate over array items
var fruits = ['apple', 'banana', 'orange'];
fruits.forEach((fruit, index) => {
	console.log(index, fruit);
});

// map()
// Creates a new array populated with the results of calling a provided function on every element in the calling array
var numbers = [1, 2, 3, 4];
var doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// can also be used to map and iterate through array of objects
var objects = [
	{ name: 'John', age: 21 },
	{ name: 'Mary', age: 18 },
];

objects.map((item) => item.name); // pluck value from array of objects to array of values

// filter()
// creates a new array with all elements that pass the test implemented by the provided function
let numbers = [1, 2, 3, 4, 5];
let evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce()
// executes a reducer function on each element of the array, resulting in a single output value
// syntax:
array.reduce((accumulator, currentValue, index, array) => {
	// logic
}, initialValue);

// accumulator: The accumulated value from the previous iteration (or the initial value if provided).
// currentValue: The current element being processed in the array.
// index (optional): The index of the current element being processed.
// array (optional): The array reduce() is called on.
// initialValue (optional): The initial value for the accumulator. If not provided, the first element of the array is used as the initial accumulator

let numbers = [1, 2, 3, 4];
let sum = numbers.reduce(
	(accumulator, currentValue) => accumulator + currentValue,
	0
);
console.log(sum); // 10

let numbers = [1, 2, 3, 4];
let product = numbers.reduce(
	(accumulator, currentValue) => accumulator * currentValue,
	1
);
console.log(product); // 24
```

```js
// array destructuring
// allows you to unpack values from arrays (or objects) and assign them to variables
// A simple array with three values
const fruits = ['apple', 'banana', 'cherry'];

// Destructuring the array into variables
const [firstFruit, secondFruit, thirdFruit] = fruits;

console.log(firstFruit); // output: apple
console.log(secondFruit); // output: banana
console.log(thirdFruit); // output: cherry

// destructure with a default value
const colors = ['red', 'blue'];
const [primaryColor, secondaryColor, tertiaryColor = 'green'] = colors;

// desctructure a returned value
function getCoordinates() {
	return [10, 20];
}

// destructuring the result into variables
const [x, y] = getCoordinates();
console.log(x); // output: 10
console.log(y); // output: 20
```

### Objects

```js
// 2 ways of creating objects
var myCar = {}; // creating empty object
var myCar = new Object(); // using the Object object

// assigning properties to the object
myCar.driver = 'Shaun Yao';
myCar.maxSpeed = 50;

// accessing value of properties
// using dot (.) notation:
console.log(myCar.driver);

// using bracket (['']) notation:
// use for getting values by dynamic variable
console.log(myCar['driver']);

// adding method to the object
myCar.drive = function () {
	console.log('Now driving!');
};

// using shorthand notation for creating objects
var myCar2 = {
	maxSpeed: 80,
	driver: 'David blane',

	drive: function () {
		console.log('Now driving!');
	},
};

// passing parameters to the object's method
var myCar3 = {
	maxSpeed: 50,
	driver: 'Shaun Yao',
	drive: function (speed, time) {
		console.log('Your Speed is: ' + speed * time);
	},
};

myCar3.drive(50, 3);

// this
// this keyword refers to what object currently owns the space
var myCar = {
	maxSpeed: 80,
	driver: 'David blane',

	drive: function (parameter) {
		console.log('Now driving!');
	},
	test: function () {
		console.log(this); // this will log the this (current object) into the console
	},
};

// constructor
// constructor is a function to create an object
// constructor starts with capital letter for conventions
// components: constructor name, parameters, property name, values
var Car = function (d, s) {
	this.driver = d;
	this.maxSpeed = s;

	this.drive = function (speed, time) {
		console.log('Your speed is: ' + speed * time);
	};
	this.logDriver = function () {
		console.log('The driver is: ' + this.driver);
	};
};

// another syntax for creating constructor:
function Car(d, s) {
	this.driver = d;
	this.maxSpeed = s;

	this.drive = function (speed, time) {
		console.log('Your speed is: ' + speed * time);
	};
	this.logDriver = function () {
		console.log('The driver is: ' + this.driver);
	};
}

// creating object from constructor
var myCar2 = new Car('David', 50);
var myCar3 = new Car('John', 80);

// putting objects inside array
var people = [];

function Person(name, age) {
	// Function constructor
	this.name = name; // do not forget 'this.'
	this.age = age;
}

function addPerson(name, age) {
	var p = new Person(name, age); // here we create instance
	people.push(p);
}

addPerson('Petia', 80);
addPerson('Vasia', 20);

function totalAge() {
	var total = 0; // do not name local variables same as function
	var i; // use var for i variable, otherwise it would be global variable

	for (i = 0; i < people.length; i++) {
		total += people[i].age;
	}
	return total;
}

var total = totalAge();
console.log(total);

// returning value of parameters using object
function sayHello(name) {
	retVal = 'hello ' + name;
	return { code: 1, message: retVal };
}

// and while calling
var returnVal = sayHello('John');
var code = returnVal.code;
var msg = returnVal.message;

console.log(code);
console.log(msg);

// convert object to array then sort by value
var obj = {
	17: {},
	22: {},
	25: {},
};

var arr = Object.values(obj);

arr.sort((a, b) => {
	return a.level - b.level;
});

console.log(arr);

// adding a method in an object using ES6 syntax
const person = {
	name: '',
	walk() {
		console.log('i can walk.');
	},
};

// binding an object
const person = {
	name: '',
	walk() {
		console.log('i can walk.');
	},
};

const walk = person.walk.bind(person);
walk(); // in this case the method from the object person was binded with the walk constant
```

```js
// object destructuring
const address = {
	street: '',
	city: '',
	country: '',
};

var street = address.street;
var city = address.city;
var country = address.country;

// to avoid redundancy in assigning value from objects
// destructuring an object to assign multiple variables
// variable name should matched the keys
var { street, city, country } = address;

// defining different name (alias) for the property
var { propertyName: newName } = address;
var { street: st } = address;
// console.log(st);

// in dealing with objects, when the key name matches the variable name you can use shorthand syntax
var obj = { id, label, price };

// same as writing this
var obj = { id: id, label: label, price: price };
```

```js
// nested destructing
// extracting a properties from object inside an already destructured object
const {
	register,
	handleSubmit,
	formState: { errors },
} = useForm();

// useForm() - returns an object with multiple properties like register, handleSubmit, and formState
// formState itself is an object with properties like errors, isDirty, and more
// extracting errors directly from the formState object
{
	formState: {
		errors;
	}
}

// destructuring technique that separates a field from the other properties
// function that will pass an object as argument
updateProduct({ id: productId, title: title, price: price });

// extract the id separately and group the other properties in one variable
// now you can use the id variable and patch variable that contains an object of other properties
updateProduct: ({ id, ...patch }) => ({});

// spreading the result of a map and put each object in the array
// spread operator (...) is used to take each item in result.relatedProducts
// (after mapping it to { type: 'Category', id: related.id }) and insert it into the array
providesTags: (result, error, id) =>
	result
		? [
				{ type: 'Category', id },
				...result.relatedProducts.map((related) => ({
					type: 'Category',
					id: related.id,
				})),
		  ]
		: [][
				// Without spread, this produces a nested array:
				({ type: 'Category', id },
				[{ type: 'Category', id: related.id }])
		  ][
				// Instead of a flat array, which we need:
				({ type: 'Category', id }, { type: 'Category', id: related.id })
		  ];
```

```js
// Object.assign
// updating the properties of an object by merging another object
// copies all properties from updatedData to draft,
// replacing properties in draft with those in updatedData without creating a new object
const draft = { name: 'Old Product', price: 100 };
const updatedData = { price: 120 };
Object.assign(draft, updatedData);
console.log(draft); // { name: 'Old Product', price: 120 }
```

```js
// Set() object
// allows you to store unique values of any type, whether primitive values or object references
// automatically ensures that all values are unique. If you try to add a duplicate value, it will not be added
// create a Set using the Set constructor
const mySet = new Set();

const numberSet = new Set([1, 2, 3, 4]);
console.log(numberSet); // Set { 1, 2, 3, 4 }

// add values to a Set using the add() method
mySet.add(1);
mySet.add(2);
mySet.add(2); // This will not be added since 2 is a duplicate
console.log(mySet); // Set { 1, 2 }

// remove values using the delete()
mySet.delete(1);
console.log(mySet); // Set { 2 }

// check the number of values in a Set using the size property
console.log(mySet.size); // 1

// iterate over a Set using forEach() or a for...of loop
mySet.forEach((value) => {
	console.log(value);
});

for (const value of mySet) {
	console.log(value);
}

// has() method is used to check whether a value exists in a Set
// case-sensitive when checking for string values
mySet.has(value);

mySet = new Set([1, 2, 3]);
console.log(mySet.has(2)); // true
console.log(mySet.has(4)); // false

const strSet = new Set(['hello', 'world']);
console.log(strSet.has('Hello')); // false
console.log(strSet.has('hello')); // true

// reference checking in objects
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' };
const obj3 = obj1; // reference to obj1

const objSet = new Set();
objSet.add(obj1);

console.log(objSet.has(obj1)); // true
console.log(objSet.has(obj2)); // false (different reference)
console.log(objSet.has(obj3)); // true (same reference as obj1)
```

```js
// class inheritance
class Person {
	constructor(name) {
		this.name = name;
	}

	walk() {
		console.log('walk');
	}
}

class Teacher extends Person {
	constructor(name, degree) {
		super(name); // super method is needed when a class is extended from a parent class
		this.degree = degree;
	}

	teach() {
		console.log('teach');
	}

	// example method that uses a method from the parent class
	introduce() {
		console.log(`Hello, my name is ${this.name} and I am a teacher.`);
		this.walk(); // calling the inherited walk method from the parent class
	}
}

var teacher = new Teacher('John', 'BSIT');
teacher.introduce();
teacher.walk();
```

### Dates & Time

```js
// the Date object is use to create dynamic date
var myDate = new Date();
console.log(myDate); // show the current date and time by default

// syntax: Date(yr,mo(0-11,Jan-Dec),day(1-31),hr,min,s);
var myPastDate = new Date(1993, 11, 2, 10, 30, 15);

// Date methods
myDate.getFullYear();
myDate.getMonth();
myDate.getDay(); // (0-6, Sun-Sat)
myDate.getDate();
myDate.getHours();
myDate.getTime(); // get the exact number of milliseconds since 1st Jan 1970, this is useful in comparing date

// format date
console.log(
	date.toLocaleString('en-US', {
		weekday: 'short', // long, short, narrow
		day: 'numeric', // numeric, 2-digit
		year: 'numeric', // numeric, 2-digit
		month: 'long', // numeric, 2-digit, long, short, narrow
		hour: 'numeric', // numeric, 2-digit
		minute: 'numeric', // numeric, 2-digit
		second: 'numeric', // numeric, 2-digit
	})
);
// output: Tue, July 21, 2020, 10:01:14 AM

// adding months to date
var newDate = new Date(today.setMonth(today.getMonth() + 2));
console.log(newDate);

// create and format date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const month = today.toLocaleString('default', { month: 'long' });
var yyyy = today.getFullYear();
var now = month + ' ' + dd + ', ' + yyyy;

// other method of create and format date
var today = new Date();
var now = today.toLocaleString('default', {
	month: 'long',
	day: '2-digit',
	year: 'numeric',
});
```

### Document Object Model (DOM)

```js
// document object model - application programming interface where you can manipulate the document elements
// model is the structure of the element
// node is everything that you can change in the document (e.g. elements, text, attributes)

// get an object properties / methods
console.dir(document);

// getting nodes(dom elements) and store it into a variable
var myContent = document.getElementsByClassName('content'); // this will return an array of elements

// getting element inside an element
var myH2 = myContent[1].getElementsByTagName('h2'); // in this case, getting the h2 element inside a div element which is one of the elements ([1]index) in the array
// the ^ above variable will also return an array of elements

// change the element inside the element
myH2[0].innerHTML = 'Hey! Whatsapp!';
document.getElementById('title').innerHTML = 'NEW TITLE!';
// getElementById, this will return only one element because id is unique only in one element

// methods and properties used to manipulate the dom
var myBody = document.getElementsByTagName('body');

myBody.innerHTML; // this will return all the elements inside the body tag

var title = document.getElementById('title');
title.textContent; // get the text (only the text not tags) of an element

// changing and getting an element's attribute value (using methods)
var link = document.getElementById('link');
link.getAttribute('href'); // getting the attribute value of an element by passing its attribute name, result: "#"
link.getAttribute('class'); // result: "class-link"

// changing attribute value (using methods)
link.setAttribute('class', 'new-class'); // change the attribute value by passing its "attribute name" & "attribute value"
link.setAttribute('name', 'someName'); // you can also add new attribute in an element by passing its "attribute name" & "attribute value"

// changing and getting an element's attribute value (using properties)
link.className; // return the value of the class attribute
link.className = 'new-class'; // change the value of the class attribute
link.href; // return the "full" value of the href attribute
```

```js
// styles
// changing styles of an element
link.style; // return the inline style properties (css rules) of an element
link.setAttribute('style', 'position:relative;'); // adding style attribute & style property in an element
link.setAttribute('style', 'position:relative;');

link.style.left = '20px'; // changing the value of a specific property & adding a new property of an element
link.style.backgroundColor = '#fff'; // we use camelcase to add a hyphenated property to avoid getting error
```

```js
// elements
// creating new element
var newLi = document.createElement('li');
var newA = document.createElement('a');

// placing the newly created element in the dom
var menu = document.getElementById('main-nav').getElementsByTagName('ul')[0]; // getting the first ul element ([0]index) in the array
menu.appendChild(newLi); // append/add a new element
newLi.appendChild(newA);
newA.innerHTML = 'blog';

// placing the element before the list of element in the array
menu.insertBefore(newLi, menu.getElementsByTagName('li')[0]); // parameters: (new element, position before the target element in the array)

// adding element with event listeners
// listening to multiple buttons wrapped in div with id
// element references
var parent = document.getElementById('list');
var buttons = document.getElementById('buttons');

// single #buttons event delegate
buttons.addEventListener('click', function (event) {
	// event.target contains the element that was clicked
	// targeting the value of "data-myitem='string'" html attribute
	var item = event.target.dataset.myitem;

	if (item === undefined) return false;

	var li = document.createElement('li');
	var textNode = document.createTextNode(item);

	parent.appendChild(li).appendChild(textNode);
});
```

```js
// removing an element by array index
// option 1
var parent = document.getElementById('main-nav').getElementsByTagName('ul')[0]; // getting the parent element
var child = parent.getElementsByTagName('li')[0];
parent.removeChild(child); // remove one of the child of the parent element
var removed = parent.removeChild(child); // store the removed element into a variable, so you can restore it again

// removing first / last child of an element
parent.removeChild(parent.firstChild);
parent.removeChild(parent.lastChild);

// remove all element
// option1
var parent = document.getElementById('foo');
parent.innerHTML = '';

// option2
// individually remove by while loop from first to last
var parent = document.getElementById('foo');

while (parent.firstChild) {
	parent.removeChild(parent.firstChild);
}

// getting form elements
document.forms.myForm;

var myForm = document.forms.myForm;
myForm.txtBox; // getting the input with a name="name"
myForm.txtBox.value; // getting the value of the input
```

```js
// modern selectors
// document.querySelector()
// allows you to select the first element that matches a CSS selector
let header = document.querySelector('h1'); // Selects the first <h1> element
let button = document.querySelector('.btn'); // Selects the first element with the class 'btn'
let element = document.querySelector('#myElement'); // Selects the element with the id 'myElement'

// document.querySelectorAll()
// allows you to select all elements that match a CSS selector.
// It returns a NodeList, which is similar to an array
let items = document.querySelectorAll('.item'); // Selects all elements with the class 'item'

// Iterates over the NodeList and logs each item
items.forEach((item) => {
	console.log(item);
});

// remove a class from all the elements
const links = document.querySelectorAll('nav a');
links.forEach((link) => link.classList.remove('active'));

// add a class to the current element "this" object
this.classList.add('active');
```

### JavaScript Events

```js
// events, are action that will trigger/fire a certain function or code
// adding an event to an element
var link = document.getElementById('link');

// adding the event and assigning an anonymous function (function without a name)
link.onclick = function () {
	alert('Hooraayy!!');
};

// window onload event
// useful if you place a jsscript at the head section of the html
function setUpEvents() {
	// some code here
}
// fire a function after the window has fully loaded (and all elements, files, script has been loaded)
window.onload = function () {
	setUpEvents();
};

// adding event
// onfocus, when an element is on focus
myForm.txtBox.onFocus = function () {
	myForm.txtBox.style.border = '4px solid pink';
};

// onblur, when an element is out of focus
myForm.txtBox.onBlur = function () {
	myForm.txtBox.style.border = 'none';
};

// onSubmit event
// onSubmit, interrupts with server before the data is submitted
// useful for client side validations
var myForm = document.forms.myForm;
var message = document.getElementById('message');

myForm.onsubmit = function () {
	if (myForm.txtBox.value == '') {
		message.innerHTML = 'Please enter a name.';
		return false; // throw in an error to prevent the form from being submitted to the server
	} else {
		message.innerHTML = '';
		return true;
	}
};

// check if offline / online
addEventListener(`offline`, (e) => {
	alert(`please check your internet connection`);
});

addEventListener(`online`, (e) => {
	alert(`You are now online`);
});

// listening to an events with a keystrokes
// example of running of event when "Escape" key is clicked
const handleEscapeKey = (event) => {
	if (event.key === 'Escape' || event.key === 'Esc') {
		// code to execute when the Escape key is pressed
		console.log('Escape key pressed');
		// you can add any other action here
	}
};

// execute the function when a key is pressed
document.addEventListener('keydown', handleEscapeKey);
```

### JavaScript Modules

```js

// import and exporting modules
// to access something from a file we need to export it
// sample code in Person.js
export class Person {
	constructor(name) {
		this.name = name;
	}

	walk() {
		console.log('walk');
	}
}

// then in the file where we need to consume code from another we use 'import'
import { Person } from './Person';

class Teacher extends Person {
	constructor(name, degree) {
		super(name); // super method is needed when a class is extended from a parent class
		this.degree = degree;
	}

	teach() {
		console.log('teach');
	}
}

// we can also use default export if only one object has to be exported
export default class Bar {
	constructor(name) {
		this.name = name;
	}

	walk() {
		console.log('walk');
	}
}

// exporting a named export
export const someFunction = () => {}

// exporting both default and named export together
export { Something as default, Other };

// re-exporting a default export and make it a named export
export { default as authReducer } from './authSlice';

// exporting all named export using wildcard operator
// all of the named export will be combined and available for import
// code in index.js
export * from './authSlice';
export * from './authActions';
export * from './authSelectors';

// importing default & named export
// key concepts:
// default export: can import it with any name
// named export: must import it using the same name as it was exported

import Something from ''; // when getting default export
import { Something } from ''; // when getting named export
import canBeAnyName, { actualNameOfExported } from ''; // importing both default and named exports
import { Export1 as NewName1, Export2 as NewName2 } from 'module'; // renaming a named exports using alias

```

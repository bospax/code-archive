# React + PropTypes

### Setup & Configuration

`npm install prop-types`

```js
// import proptypes in the component
import PropTypes from 'prop-types';
```

### Types & Methods

```js
Basic PropTypes
PropTypes.any
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.symbol

Complex PropTypes
// An array of a specific type, where type is another PropType.
PropTypes.arrayOf(type)

// For example:
PropTypes.arrayOf(PropTypes.string)
let exampleArrayOfStrings = ['red', 'blue', 'green'];

// An object with property values of a specific type.
PropTypes.objectOf(type)

// For example:
PropTypes.objectOf(PropTypes.number)
let exampleObjectOfNumbers = { apple: 1, banana: 2, orange: 3 };
```

```js
// An object with a specific shape, where shapeObject defines the expected keys and their corresponding PropTypes.
PropTypes.shape(shapeObject);

ShapeComponent.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string.isRequired,
		age: PropTypes.number.isRequired,
	}),
};
```

```js
// A prop that must be one of the specified values in the array
PropTypes.oneOf(array);

OneOfComponent.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
};
```

```js
// A prop that can be one of the types specified in the array
PropTypes.oneOfType(array);

OneOfTypeComponent.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
```

```js
// An array of objects that conform to a specific shape.
PropTypes.arrayOf(PropTypes.shape(shapeObject));

let exampleArrayOfShapes = [
	{ name: 'Alice', age: 25 },
	{ name: 'Bob', age: 30 },
];

ArrayOfShapesComponent.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			age: PropTypes.number.isRequired,
		})
	),
};
```

```js
// checking the exact structure of an object
PropTypes.exact(exactStructureObject);

// A prop that must be an instance of a specific class.
PropTypes.instanceOf(className);

class Person {
	constructor(name) {
		this.name = name;
	}
}

InstanceOfComponent.propTypes = {
	person: PropTypes.instanceOf(Person),
};
```

```js
// specify the type for the children prop
PropTypes.node

// when passing a component as a prop
// checks if the prop being passed is a valid React element
PropTypes.element

NodeComponent.propTypes = {
  	children: PropTypes.node,
};

NodeComponent.propTypes = {
  	children: PropTypes.element,
};

Required PropTypes
// prop must be a string and cannot be omitted
PropTypes.string.isRequired

// prop must be an array of numbers and cannot be omitted.
PropTypes.arrayOf(PropTypes.number).isRequired

```

### Snippets

```js
// basic array of objects:
[
	{
		label: 'Email',
		link: 'mailto:josedpachecojr@gmail.com',
	},
];
```

```js
// component:
const Link = ({ link, label }) => {};

// prop type definition:
Link.propTypes = {
	link: PropTypes.string.isRequired,
	label: PropTypes.string,
};
```

```js
// basic array of strings:
[
	'Developed and enhanced application features and functionality.',
	'Developed software test automation process.',
];

// component:
const Link = ({ responsibilities }) => {};

// prop type definition:
Link.propTypes = {
	responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};
```

```js
// array with multiple data types:
[
	42,
	'Developed application features',
	{ title: 'Lead software engineer' },
	{ title: 'Project manager' },
];

// component:
const Link = ({ data }) => {};

// prop type definition:
Link.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.shape({
				title: PropTypes.string,
			}),
		])
	),
};
```

```js
// passing a single object with nested array
{
	year: 2024,
	position: 'Project Based Web Developer',
	responsibilities: [
		'Developed and enhanced application features and functionality.',
		'Developed software test automation process.',
	]
}

// component:
const Career = ({ career }) => {};

// prop type definition:
// (assigning prop type into variable)
const CareerPropType = PropTypes.shape({
	year: PropTypes.number.isRequired,
	position: PropTypes.string.isRequired,
	responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
});

Career.propTypes = {
	career: CareerPropType.isRequired,
};
```

```js
// passing an array of objects
[
	{
		name: 'Sedar HR Recruitment System',
		folder: 'rdf-sedar-recruitment',
	},
];

// component:
const ProjectList = ({ projects }) => {};

// prop type definition:
ProjectList.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			folder: PropTypes.string.isRequired,
		})
	).isRequired,
};
```

```js
// passing a function prop
const ProjectFilter = ({ selectedFilter, onFilterClick }) => {};

ProjectFilter.propTypes = {
	selectedFilter: PropTypes.string.isRequired,
	onFilterClick: PropTypes.func.isRequired,
};
```

```js
// array of objects with nested array of objects
[
	{
		category: 'FrontEnd',
		techs: [
			{
				id: 5,
				name: 'React',
			},
			{
				id: 6,
				name: 'Vue',
			},
		],
	},
];

// component
const SkillSet = ({ skillset }) => {};

// prop type definition
SkillSet.propTypes = {
	skillset: PropTypes.shape({
		category: PropTypes.string.isRequired,
		techs: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};
```

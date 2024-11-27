# SCSS Preprocessor

### Fundamentals & Concepts

```scss
// this is a comment
// sass
// learning scss syntax

// variable
// storing value into a variable
$variable: #fff;

#element {
	background-color: $variable;
}

// nested element
// best practice: not going too deep levels in nesting
#parent {
	background-color: $variable;

	// targeting element inside the parent element
	.child-element {
		font-size: 1em;
	}
}
```

### Mixins

```scss
// are functions or chunk of styles that you can apply to an element
// refer to the sass documentation for more builtin function you can use
@mixin mixinName {
	border: 1px solid #ccc;
	border-radius: 3px;
	color: #fff;

	// you can also target an element via nesting in mixins
	span {
		font-size: 5px;
	}
}

// calling the mixin
.button {
	@include mixinName;
	// giving a specific style for this element overwriting the mixin
	border: 2px solid #ccc;
}

// mixins with parameters
@mixin mixinName($r, $l) {
	margin-right: $r;
	margin-left: $l;
}

// passing arguments to the mixin
.element {
	@include mixinName(10px, 10px);
}
```

### Content Keyword

```scss
// content use to pass properties of specific element to the mixin
@mixin mixinName($param) {
	@media screen and (width: $param) {
		@content;
	}
}

// calling the mixin with the content keyword
.element {
	@include mixinName(800px) {
		// all properties here will be passed at the content keyword and will be modified by the mixin dynamically
		display: block;
		font-size: 20px;
	}
}

// passing unknown number of arguments
// $param... ->> this means that the mixin will accept unknown number of arguments
// nth(param, position) ->> binding the arguments to the parameter by specifying its position
@mixin mixinName($param...) {
	@media screen and (width: nth($param, 1)) {
		@content;
	}
}
```

### Conditionals

```scss
// if statement
// getting the  length of the argument passed in the mixin
@mixin mixinName($param...) {
	@if length($param) == 1 {
		@media screen and (width: nth($param, 1)) {
			@content;
		}
	}

	@if length($param) == 2 {
		@media screen and (min-width: nth($param, 1)) and (max-width: nth($param, 2)) {
			@content;
		}
	}
}

.element {
	@include mixinName(600px, 900px) {
		display: block;
		font-size: 20px;
	}
}
```

### Importing External Files

```scss
// importing files is based on priority
// import the file at the top of the other which you need first
@import 'path';

// pseudo element / class
a {
	color: #fff;

	// apply the pseudo class within the element you want
	&:hover {
		color: #000;
	}
}

// mathematical operator
// you can use math operation in sass
li {
	width: (100% / 6);
}
```

# Cascading Style Sheets

### CSS Specificity

```css
/* */ /*comment sa css*/

/*css specificity*/
/*note that css is read by the browser top to bottom
meaning one rule can be overwritten by another rule proceeding it*/

/*the rule with more "specific selection" declared will be the
priority of the browser.*/

/*thousandth, hundreds, tenth, once*/
/*1 tag = 1 point to once column*/
/*2 tag = 2 point to once column*/
/*class = 1 point to tenth column*/
/*id = 1 point to hundreds column*/
/*inline style = 1 point to thousandth column*/

/*to put it simply 1 tag = 1 point, 2 tag = 2 points, class selector = 10 points, id selector = 100 points, inline styles = 1000 points
the selector with the most points wins everytime.*/

parent children structure:

> parent
	> direct child
		> nested child
	> direct child
		> nested child
```

### Pseudo Classes

```css
/* #pseudo classes */
/* pseudo class - :
pseudo element - :: */
/*pseudo won't effect images*/
.wrapper a:hover {
	/* hover is the state */
	/*they are also called the pseudo classes*/
	/*e.g. first-letter, first-line, first-child, last-child, before, after, focus, hover, active, visited etc.*/
	background-color: red;
}

.wrapper a:active {
	background-color: blue;
}

/*before and after pseudo elements are use for inserting content or other elements*/
li::before {
	/*this will insert a content before the content of the selected element*/
	content: '\00BB'; /*here we put a hexadecimal code for right angle bullets in the content before the selected element*/
	/*for more hexadecimal code (unicode code converter) check out->> rishida.net/tools/conversion/ */
}

p:after {
	/*this will put an element after all the paragraph*/
	content: '';
	height: 50px;
	width: 50px;
	display: block;
	background-color: yellow;
}

.meta li:after {
	content: '\\'; /*adding a backslash to scape*/
	padding: 0 10px; /*breathing room. padding left, right*/
}

.meta li:last-child:after {
	/*last part ng list walang content or for example backslash*/
	content: none;
}

/*selecting an element attribute and show its value*/
/*this will show the value of the attribute of an element*/
input::before {
	content: attr(type) ':';
}

/*an element input with a attribute primary*/
input[primary]::after {
	content: '(' attr(primary) ')';
}
```

### Selectors

```css
/* #selectors */
*::before {
	/*using universal selectors on pseudo element*/
	content: '';
}

* {
	/* (*)universal selector */
	margin: 0;
	padding: 0;
}

/* element selector */
p {
	color: blue;
}

/* class selector */
.my-class {
	color: green;
}

/* id selector */
#idname {
	width: 600px;
	height: 500px;
}

/* attribute selector */
a[href] {
	color: orange;
}

/* pseudo-class selector */
p:hover {
	color: purple;
}
```

```css
/*multiple selectors*/
.wrapper,
.nav {
	/*separated by commas*/
	background-color: red;
}

/*child selector*/
.wrapper ul li ul li {
	/*separated by space*/
	color: red;
}

div > p {
	/* target all element with div and p parent-child combination */
}

div + p {
	/* target only the first direct p child of the parent div element */
}

div ~ p {
	/* target all the direct p child/children of the parent div element */
}
```

```css
/*direct child selector*/
.nav > p {
	/*> this is a DIRECT child selector and it points only in the child element directly and will not effect any other element with the same tag inside the element (nav)*/
	display: inline;
	/* takes this item and display them inline (align in straight line) */
}

.nav > li > ul > li {
	/*this will select the element inside the ul which is the li (within the li element and inside the nav element)*/
	background-color: blue;
	/*children of the list item which is childrean of the ul which is the li will have a background of color blue*/
}

p > a {
	color: yellow;
}

/*class selector*/
ul.list {
	/*(without a space) this will select the tag with the name of the class*/
	background: #fff;
}
```

```css
/*two-class selector*/
.wrapper.main {
	/* two-class selector, targeting a two class containing element, writing it without space */
	/* but when your write it this way:  .wrapper .main (with space between them) it will tell target the class inside a class (main class inside wrapper class) */
	background-color: #404040;
	width: 500px;
	height: 500px;
	/* margin: 200px 150px 30px 50px; */
	/* top, right, bottom, left, (clockwise) */
	/* margin: 200px 150px; */
	margin: 200px auto;
	/* top & bottom, left & right */
	/* auto to center the div */
	/* margin: 200px 150px 30px; */
	/* top, right & left, bottom*/
	border-width: 5px;
	border-style: solid;
	/* dashed, none, etc. */
	border-color: yellow;
	/* border: 5px dashed black; */
	/* combination of properties */
	/* width of padding and border will combine to the total width of the box model */
}
```

```css
/*adjacent selector*/
ul + p {
	/*adjacent selector will select the only one element next to the element*/
	/*here in this case we select the p element which is next to the ul element*/
	/*note that tags in within a div will be ignored and jump to the next matching tags*/
	font-weight: bold;
}

li + li {
	/*here we target a list in navigation and give them margin on the left of 20px*/
	/*note that we use adjacent selector so the last list will not contain any margin on the left*/
	/*because it will look for the li that imediately follow another li and will give it a margin of 20px*/
	margin-left: 20px;
}

.class {
	display: none;
}
/*using adjacent selector to manipulate another class on hover*/
/*here when we hover on the link with the class of "anchor" the element with
the class of "class" will change property*/
.anchor:hover + .class {
	display: block;
}
```

```css
/*sibling selector*/
ul ~ p {
	/*sibling selector is the same as the adjacent however it will select all the element with the same tags next to the element*/
	/*note that tags in within a div will be ignored and jump to the next matching tags*/
	font-weight: bold;
}

p {
	color: red !important; /*this is a declaration, it tells the browser no matter how the element with this property cannot be overwrtten*/
}
```

```css
/*attribute selector*/
span[class] {
	/*here the element is the span and the attribute is the class*/
	color: red;
}

span[class='letter'] {
	/* provided with value this will only target the class with the given value*/
	color: blue;
}

span[class~='letter'] {
	/*the tilde tells that even the class contains a whitespace seperated class (or element containing multiple class) it will be included in the selector*/
	color: blue;
}

a[href$='pdf'] {
	/*putting dollar sign, this tells to grab all the anchor tags with href attribute which ends in "pdf"*/
	color: red;
}

a[href^='http'] {
	/*putting carret sign, this tells to grab all the anchor tags with href attribute which starts in "http"*/
	color: maroon;
}

/*grabbing all the combination of first of type of an element inside an element*/
/* in this sample it will grab all combination of element with the first tag of p inside an article tag */
article p:first-of-type {
	color: blue;
	list-style: none;
}
```

```css
/*nth-child pseudo selector*/
/* this will affect siblings of the target element relative to its parent */
p:nth-child(1) {
	/* in this example this will effect all the first p child tag inside a parent tag */
	color: white;
}

.nth li:nth-child(1),
li:nth-child(5) {
	/*here we select the element we want base on number*/
	color: blue;
	list-style: none;
}

.nth li:nth-child(even) {
	/*here we select the even children*/
	color: red;
}

.nth li:nth-child(3n + 1) {
	/*selecting using formula, where n = 0*/
	background-color: gray;
}

/*nth-of-type selector*/
.nth-type article:nth-of-type(1) {
	/*here we grab the number element with corresponding type of tag (in this case the article) 
	and will ignore all other tags even they are children of the same parent*/
	background-color: green;
}
```

```css
/*combining selectors*/
/*selecting a class from different element tags (different element but same class)*/
/*in this case we have div and article tag labeled with the same class*/
/*here both of the element will be given a color property of purple*/
.sameclass {
	background-color: purple;
}

/*while here we declare the element we want to select and combined it with the name of its class (without space)*/
article.sameclass {
	background-color: yellow;
}
```

### Fonts & Text

```css
/* #fonts & text */
p {
	text-decoration: none; /*most commonly use to remove underline in text*/
	text-align: center;
	font-family: helvetica, Arial, sans-serif; /*fallback style in case di available yung isang font style*/
	letter-spacing: 5px;
	line-height: 10em; /*em - unit of measurement. the width of letter "m" base on the declared font-family*/
	text-transform: lowercase;
	text-shadow: 5px 10px 10px red; /*h-axis, v-axis, blur, color*/
	text-shadow: 5px 10px 10px red, 6px 2px 0px white; /*for multiple shadow*/
	text-indent: -9999px; /*to move the text off the screen*/
	/*research for different image text replacement technique*/
	font-family: helvetica, arial, sans-serif; /*arial, sans-serif is the fallback*/
	font-style: italic;
	font-style: normal;
	font-style: oblique;
	font-variant: small-caps;
	font-variant: small-caps;
	font-variant: normal;
	font-variant: initial;
	font-variant: inherit;
	font-weight: 900;
	font-weight: bold;
	text-indent: 100px;
	font-size: 1.4em;
	font: small-caps italic 900 1.4em Helvetica, Arial, sans-serif; /*combination of all properties from above*/
	color: blue;
}
```

```css
/*font-weight*/
/*can also range from 100-900*/
/*100-300 lighter, 400-600 normal, 700-900 bolder*/
article p {
	font-weight: bold;
}

/*text-transform*/
/*capitalize, uppercase, lowercase*/
article p {
	text-transform: uppercase;
}

/*spacing*/
/*the default line-height is the font-size itself*/
/*the em will take the font-size value of the font and multiplied it by its value*/
article p {
	letter-spacing: 10px;
	word-spacing: 10px;
	line-height: 10px;
}

/*text shadow*/
/*text shadow has 4 values : horizontal offset, vertical offset, blur radius value and the color value*/
/*google around some text shadow effects*/
h3 {
	font-family: Helvetica, sans-serif;
	color: #333;
	text-shadow: 3px 3px 3px #000; /*value to the right, value down, blur radius, color*/
	text-shadow: 3px 3px 3px #000, -3px -3px 3px yellow; /*you can also add another shadow, separating them with comma*/
}
```

```css
/* using font external link */
@import url('');
@import url('https://fonts.googleapis.com/css?family=Muli');

/* shorthand for multiple font imports */
@import url('https://fonts.googleapis.com/css?family=Unica+One|Vollkorn');
```

```css
/*using google fonts*/
h2 {
	font-family: 'Mogra', cursive, Helvetica, sans-serif;
	color: purple;
}

/*hosting your own font on your on server. (to put simply: the font file is located at your site directory)*/
@font-face {
	font-family: 'kaushan_scriptregular';
	src: url('../fonts/kaushanscript-regular-webfont.woff2') format('woff2'), url('../fonts/kaushanscript-regular-webfont.woff')
			format('woff'),
		url('../fonts/KaushanScript-Regular.otf') format('opentype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'fredoka';
	src: url('../fonts/fredoka_one/FredokaOne-Regular.ttf') format('TrueType');
	font-weight: normal;
	font-style: normal;
}

h1 {
	font-family: 'kaushan_scriptregular', Helvetica, sans-serif;
	color: maroon;
	font-size: 50px;
}
```

### CSS Units & Sizing

```css
/* #css units */
/*font-sizing*/
/*absolute units: pixels(px), inches(in), centimeters(cm), millimeters(mm), points(pt), picas(pc).

/*absolute lengths don't base their meansurement on anything else, instead they are base on real world units*/

/* relative units: percentages(%), font-sizes(em & rem), character-sizes(ex & ch), viewport dimensions(vw & vh), viewport max(vmax), viewport min(vmin); */

/*relative lengths get their measurement base on something else (e.g. parent dimension, viewport, current declared font-attributes)*/

/*percentage*/
article {
	font-size: 16px;
}
/*we take the 50% of the inherited font-size which is 16px*/
/*16*.50 that will be 8px (50% of 16px is 8px)*/
article p {
	font-size: 50%;
}
```

```css
/*font attribute based units*/
/*sizes that are based on currently declared font*/
/*ex, ch, em, rem*/
/*the ex is based on the font-size of the character "x" of the font-family currently used*/
/*ex & ch*/
.ex {
	background: #fff;
	height: 5ex;
	font-size: 20px;
	/*value of ex is proportional based on the font-size of the character "x"*/
	/*but also depends on font-family that is currently used*/
	height: 5ch;
	/*the ch is based on the width of "0" number*/
}
```

```css
/*rem & em*/
/*rem & em are based on the inherited font-size*/
/*em unit are good for responsive layouts specially buttons,
when use as units on margins/padding it will look on font-size of its element
and multiply to its size*/
/*note: em cascades (meaning when a font-size with a value of 2em put inside a parent with font-size value of 2em it will 
multiply and the result is 4em)*/
/*here all of the element inside the article tag will be given 16px font-size*/
/*it overwrites the default browser font-size which is 1.5em*/
article {
	font-size: 16px;
}
/*note that relative are great for responsive designs*/
/*the inherited font-size of h2 from its parent article which is 16px
will be overidden by em multiplying it by its value*/
/*in this case 16*4, now it has a font-size of 64px (therefore: 4em = 64px)*/
article h2 {
	font-size: 4em;
}
/*rem (root em)*/
/*rem do not cascade, they are base on the root element (value of rem multiplied to the value of the root element)*/
/*if you change the parent font-size it will affect the em but not the rem*/
/*rem are helpful if you want to change the size of everything at once*/
article h3 {
	font-size: 2rem;
}
```

```css
/* #viewport */
/*viewport dimension based units: vw, vh, vmin, vmax*/
/*vw & vh divided the viewport into a grid with 100 units*/
/* viewport ito yung size na visible sa screen, browser man or sa mobile view */
.vw {
	background: #fff;
	height: 400px;
	width: 50vw; /*the width will be 50% of the viewport*/
	/*you can also give the value into reverse property, 
	meaning you can give a value of vw into the height property*/
	/* automatic mag aadjust yung element base sa size ng viewport (vh, vw) */
}
/*vmin vmax will respond to the browser depending on which is smallest or biggest proportional to min or max value*/
.vmin {
	background: #fff;
	height: 400px;
	width: 50vmin;
	/* here kukunin nya yung 50% base kung alin yung smallest sa viewport units (width or height ng viewport) */
	/* if smallest yung height ng viewport compare sa width, it will take the 50% of the height or vise versa */
	width: 50vmax;
	/*same is true in vmax, yung width ng element is 50% base sa largest of the viewport units*/
}

.box-model7 {
	width: 100%;
}
```

```css
/* #columns */
.box-model7 p {
	column-count: 4;
	column-gap: 40px; /*distance apart*/
	column-rule: 1px solid #0000ff;
}

.box-model8 ul {
	column-count: 2;
	list-style: inside disc; /*we use inside position to put the bullets inside the column*/
}

.box-model8 li {
	-webkit-break-inside: avoid;
	-moz-column-break-inside: avoid;
	column-break-inside: avoid;
}
```

```css
/* auto resize height with transition */
/* css for the body container */
.body {
	height: 0;
	transition: height 0.5s;
}
/* expand the height to auto when the element is shown */
.body.show {
	height: auto; /* fallback when calc-size is not supported by the browser */
	height: calc-size(auto);
}
```

```css
/* the 62% hack */
/* this is a way to convert pixels to rems to make responsive units*/
/* setting the root html font-size to 62% */
html {
	box-sizing: border-box;
	font-size: 62.5%;
}
/* and then whenever you will use rems converted from pixel you just have to divided by 10 (just adding decimal point) */
p {
	/* 
		1.6rem = 16px
		2.4rem = 24px
	*/
	font-size: 1.6rem;
	margin: 2.4rem;
}
```

### Backgrounds & Images

```css
/* #images */
/*image sprites reduces the amount of request the browser make therefore making it faster*/
/*it makes a whole bunch of image into one single image*/
/*sprite is just a background positioning technique*/
/*check out spritecow.com to generate css code for correct positioning*/
/*also learn compass in and sass that help you make css sprites*/
.tut-nav li {
	list-style: none;
	margin: 20px 0;
}

.tut-nav li a {
	background-image: url('../img/logosprite.png') no-repeat;
	display: block;
	padding: 28px 10px 28px 80px;
}

.tut-nav li a.ee {
	background-position: 0 -134px; /*x and y axis*/
}

.tut-nav li a.compass {
	background-position: 0 -270px;
}

.tut-nav li a.sass {
	background-position: 0 -408px;
}

body {
	background-image: url('../img/sample.jpg');
	background-repeat: repeat-x; /*this will will repeat the image horizontally (x-axis)*/
	background: gray url('../img/sample.jpg') no-repeat; /*shorthand for background property*/
}

.box {
	height: 1px;
	background: #333;
	background: black;
	background-image: linear-gradient(to right, #ccc, #333, #ccc);
	position: absolute;
	left: 175px;
	top: 320px;
	background-image: url(imagefilename.jpg) no-repeat;
	background-attachment: fixed;
	background-position: center;

	/* specify the size of image */
	background-size: auto;
	background-size: cover;
	background-size: contain;
	background-size: 100px 100px;
	background-size: 50% 50%;

	/* set image behavior */
	background-attachment: scroll;
	background-attachment: fixed;
}
```

```css
/*background*/
.box1 {
	background-color: #606060;
	background-image: url('image/sample.png'), url('image/sample.png'); /*use comma for multiple images*/
	/*the first one will be at the top of the stacks, and the last one will be at the bottom.*/
	background-repeat: round, no-repeat;
	/*the round value will repeat the image but will perfectly fit it around the edges of its container*/
	/*the first value will be applied to the first image and the second to the second image*/
	/*but if they have the same value (e.g. no-repeat), then just give them a one value and it will apply to both of them.*/
	background-position: top left, bottom right;
	/*same is true on positioning, value for their respective images are seperated by comma.*/
	background-position: 10px 20px;
	/*this says position 10px from the left and 20px from the top*/
	/*or you can use properties like bottom, right, left, top*/
	/*default position is top left*/
	background-size: 100px, 250px;
	background-size: 100px;
}
```

```css
/*multiple background*/
/*here we use a texture from ->> https://www.toptal.com/designers/subtlepatterns/*/
/*the first line of image will be on top*/
body {
	margin: 0;
	background-image: url('../images/playstation-pattern.png'),
		url('../images/playstation-pattern.png'),
		url('../images/playstation-pattern.png');
	background-color: #2f3135;
	/* in multiple images the first value is for the first image and so on */
	background-size: 100px, 200px;
	background-position: top right, center;
}
```

### Gradient & Colors

```css
/* #gradient */
/*linear-gradient*/
/*values are space sensitive*/
.box-model3 {
	background-color: white; /*we give a background of white because we want to have a gradient from white to gray*/
	background-image: -webkit-linear-gradient(top, white, #333);
	/*gradient value: (from top to bottom, the initial color, the ending color.)*/
	/*the following code was generated from css3please.com*/
	background-color: #99c9a1; /*note: always use fallback (in this case the "flat" bgcolor) for older browser compatibility*/
	background-image: -webkit-linear-gradient(
		top,
		#99c9a1,
		#941c94
	); /* Chrome 10-25, iOS 5+, Safari 5.1+ */
	background-image: linear-gradient(
		top bottom,
		#99c9a1,
		#941c94
	); /* Chrome 26, Firefox 16+, IE 10+, Opera */
	background-image: linear-gradient(
		top bottom,
		#99c9a1 0%,
		#941c94 100%
	); /*0% tells that we want to start the gradient at the very top*/
}
```

```css
.classname[title]:hover:after {
	content: attr(title);
	padding: 4px 8px;
	color: #333;
	position: absolute;
	left: 0;
	top: 100%;
	z-index: 20;
	white-space: nowrap;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-box-shadow: 0px 0px 4px #222;
	-webkit-box-shadow: 0px 0px 4px #222;
	box-shadow: 0px 0px 4px #222;
	background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
	background-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		color-stop(0, #eeeeee),
		color-stop(1, #cccccc)
	);
	background-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);
	background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
	background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);
	background-image: -o-linear-gradient(top, #eeeeee, #cccccc);
}
```

```css
/* #colors */
ul:first-of-type li:nth-child(3) {
	color: yellow;
	color: rgb(100, 200, 50); /*rgb value*/
	color: rgba(255, 0, 0, 0.3); /* rgba value. (red,green,blue with opacity) */
	color: #e3e3e3; /*hexadecimal value*/
	color: hsl(
		120,
		100%,
		75%
	); /* hue,saturation,lightness value. 360 red, 120 green, 240 blue. 0% shade of gray, 100% full color. 0% black, 100% white.*/
	color: hsla(120, 100%, 50%, 0.3); /* hsla value. hsl with opacity */
}
```

```css
/*hexadecimal colors*/
.box2 {
	background-color: #000000; /*here we give 00 (dark value) in all three channels and will result to black color*/
	/*the hex value is compose of three channels, rgb*/
	/*first two: red, second two: green, third two: blue*/
	/*from 0-9 (zero being the darkest), a-f (f being the lightest)*/
	background-color: #520000; /*52 value on red channel, and dark to the rest: result is dark red*/
	background-color: rgb(0, 0, 0); /*another way of declaring a color*/
	/*ranging from 0-255, where highest number will be the lightest*/
	background-color: rgb(250, 150, 60);
}
```

```css
/*opacity*/
.box2 {
	opacity: 1; /*note: declaring it like this will affect all the element inside the element*/
	/*ranging from 0-1*/
	/*0-completely transparent, 1-completely opaque*/
	background-color: rgba(
		250,
		150,
		60,
		0.5
	); /*this will only affect the background element and not all other elements*/
	/*using rgb with alpha (transparency) channel for opacity*/
}
```

### Box Model

```css
/* #box model */
/* block level elements will take up all the space in the document thats why elements you add will stack together */
/* block elements will take the containers full available width */
.box {
	display: block;
}

/* inline level elements align on straight line and adjacent or next to each other */
/* inline element do not respect vertical margin, padding, height. */
.box {
	display: inline;
}

/* inline-block level will give you the certain properties of block and inline elements like defining width and height of inline elements */
/* inline-block will adjust its width base on its content */
.box {
	display: inline-block;
}

/* display: none; the element will disappear and will not take any space */
/* visibility: hidden; the element will disappear but will retain its space */
.box {
	border: 1px solid white;
	border-style: inherit;
	border-color: red;
	border: 0;
	border-collapse: collapse;
	border-collapse: separate;
	width: 600px;
	min-height: 200px; /* use min height to have the height to automatically adjust base on the content */
	margin: 20px auto; /*20px margin sa lahat ng sides*/
	/*or*/
	margin-top: 20px;
	margin-bottom: 20px;
	/*or*/
	margin: 20px 0 20px 0; /*top, right, bottom, left*/
	/*or*/
	margin: 20px 0; /*top and bottom, right and left*/
	/*or*/
	margin: 20px 0 20px; /*top, right and left, bottom*/
}
```

```css
/*asterisk is a wild card (universal selector), it means everything on the page.*/
/*use this fix to avoid border, padding, margin etc. to contribute to the measurement of the model box*/
/*this fix is from the article of Paul Irish called box-sizing border box*/
/* apply a natural box layout model to all elements, but allowing components to change */
html {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}
```

```css
/*overflow*/
.classname {
	float: left;
	min-width: 600px; /*the size will not go down below the given pixel*/
	width: 80%;
	overflow: hidden;
	/*we use overflow hidden to clipped or hide any "excess" or overflowed part
	of the element outside the element*/
	/*we can also use scroll or auto value to have a scroll everytime an element overflowed on the element*/
	/*the inherit value, will only inherit the overflow value of its parent element*/
}
```

```css
/*margin collapse*/
/*margin will collapse the two element stacking each other
and will take the highest value of margin to be its margin*/
/*if you want to control the collapsing margin, give it a padding!*/
.box1 {
	/*here we specify 30px at the bottom*/
	margin: 30px;
	padding: 30px;
	border: 1px solid #000;
}
.box2 {
	/*here we specify 15px at the top*/
	margin: 15px 30px 30px 30px;
	padding: 30px;
	border: 1px solid #000;
}
```

```css
/* #border radius */
.box-model1 {
	border-radius: 20px; /*all edges will be given 20px radius*/
	border-radius: 5px 20px 40px 0px; /*the value distribution for edges is clock wise*/
	-moz-border-radius: 5px 20px 40px 0px; /*for old browser compatibility we use vendor prefixes (moz - prefix for mozilla)*/
}
```

```css
/* #box-shadow */
/*box-shadow values: x and y axis, blur radius, spread radius (this will increase the size of the shadow overall) and the color*/
/*blur and spread radius are optional*/
/*the "inset" value will give a bevel effect on the shadow*/
.box-model2 {
	box-shadow: inset 1px 1px 6px 2px black;
	box-shadow: 0px 15px 10px -8px black;
	/*the negative value of the spread radius will spread the shadow inward and will not be visible*/
	-webkit-box-shadow: 0px 15px 10px -8px black;
	-moz-box-shadow: 0px 15px 10px -8px black;
	/*for older mozilla browser use -moz- vendor prefix, for chrome, safari, use -webkit-, for IE use -ms-, and for opera use -o-*/
}
```

### Positioning

```css
/* #positioning */
.relative {
	width: 250px;
	height: 250px;
	background-color: red;
	/* if you will not define the position of an element positioning value will not going to do anything */
	position: relative;
	top: -30px; /* giving the position relative will move the element negative 30 pixel to the top relative to its normal current position or where it was */
	margin: 200px auto;
}

.absolute {
	width: 50px;
	height: 50px;
	background-color: green;
	position: absolute; /* note that absolute positioned element are absolute and will not move regardless of what position is its nearby elements */
	/* absolute position will take the position relative to its parent with position other than static(example its parent div is now positioned relative) if not then the body will be its parent */
	top: -30px; /*this will move the element negative 30 pixel relative to its relative positioned parent element */
	margin: auto;
}
```

```css
/*#float*/
.child {
	background-color: yellow;
	width: 30%;
	float: left;
	/* using float will position the element base on the value left or right and the content space left by the element will be taken place by another element */
	/* checkout the clearfix on the boilertemplate and give the clearfix class to the element you dont want to collapse when the content inside of it is being floated */
}

/*text wont overlap floating elements*/
/*use this fix in clearing floats*/
/*cause if you only use normal clearing method in the element
the margin of that element will collapse to the floated element*/
/*this also avoid the bad practice of using "extra div" containinng clearings to clear floats.*/
/*instead of using extra div, 
the :after pseudo class will put a content (in this case an empty string) after the element and will clear its the floated elements*/
/*place the clearfix on the element you dont want to collapse*/
.parent:after {
	content: '';
	display: block;
	clear: both;
}

.main-column {
	background-color: green;
	width: 70%;
	float: left;
}

.footer {
	width: 100%;
	background-color: blue;
	clear: both;
}
/*if you remove the content (in this case the foooter) you will give the clearfix below to the section class element to push it down*/
/*this is the clearfix that comes in the html5 boilerplate*/
.clearfix::before,
.clearfix:after {
	content: ' '; /* 1 */
	display: table; /* 2 */
}

.clearfix:after {
	clear: both;
}
```

```css
/*centering an element*/
/*using text-align*/
.container {
	text-align: center;
}

.container .box {
	display: inline-block;
}

/*using margin*/
.box {
	margin: 0 auto;
}

/*use this if you want to align left an element without using float*/
.box {
	margin-left: auto;
}

/*using positioning*/
.box {
	position: absolute;
	left: 50%;
	margin-left: -200px;
}
```

```css
/* #z-index */
/*from top to bottom stacking order*/
/*the further at the bottom, the higher the z-index stacking order (the value)*/
/*the further to the top, the lower the z-index stacking order*/
/*note: element should be positioned (they have declared position e.g. fixed, relative, absolute)
to have a z-index entry, otherwise they will be ignored by the browser (they won't have the stacking order)*/
/*default index is 0 (lowest stacking order)*/
/*stacking context will be affected not only by z-index but also other properties like transform or opacity*/
/*level of elements are also affected by z-index
meaning all elements inside an element with z-index of 1 will inherit that z-index stacking order (which is 1).*/
/*element with z-index will only affect siblings and not other element outside their parent.*/
nav {
	background: #333;
	padding: 5px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
}
```

```css
/* centering an element */
/* centering using flexbox */
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

/* centering using grid */
.container {
	display: grid;
	place-items: center;
	height: 100vh;
}

/* centering with absolute positioning */
.container {
	position: relative;
	height: 100vh;
}
.centered-element {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

/* centering with margin auto */
.centered-element {
	width: 50%;
	margin: 0 auto;
}

/* centering with inline/inline-block display */
.container {
	text-align: center;
	line-height: 100vh;
}
.centered-element {
	display: inline-block;
	vertical-align: middle;
	line-height: normal;
}
```

### Transform, Transition, Translate

```css
/* #transition */
/*animating states with transition*/
/*transition allows you to change properties on hover for example*/
/*values: target property, duration (how long will it take), effect (how it will look), delay*/
/*we give the property to the element (the object itself) we are going to transition*/
.box-model4 {
	/*the following was generated from css3please.com*/
	-webkit-transition: all 0.4s ease-out 1s; /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
	transition: all 0.4s ease-out 1s; /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
	transition: width 0.4s ease-out 1s; /* here only the width will be animated and not the color  */
	transition: width 0.4s ease-out 1s, background-color 2s linear; /*(targeting multiple properties) here the bg-color was given a 2s duration and a different effect*/
}

.box-model4:hover {
	width: 350px;
	background-color: red;
	color: white;
}

/* #transform */
/*rotate element*/
/*value can be rotate, translate, skew etc.*/
.box-model5:hover {
	-webkit-transform: rotate(7.5deg); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: rotate(7.5deg); /* IE 9 */
	transform: rotate(7.5deg); /* Firefox 16+, IE 10+, Opera */
}

/*using translate*/
.container {
	position: relative;
}

.container .box {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
```

### Animation

```css
/* #animation */
/* declaring the animation */
/* here we give the name 'grow' for animation */
/* and duration */
.box {
	animation: grow 1s;
}

/* creating the keyframes for the created animation */
/* keyframes determine where the animation will start and end */
@keyframes grow {
	from {
	}
	to {
	}
}

/* indicating the target property to animate */
@keyframes grow {
	from {
		scale: 0;
	}

	to {
		scale: 1;
	}
}

/*values: name, duration, delay, timing function (like ease, linear), direction (normal, alternate), times (can be a number)*/
.box-model6 {
	width: 100px;
	min-height: 100px;
	background-color: #333;
	-webkit-animation: spin 5s 3;
	-moz-animation: spin 5s 3;
	-o-animation: spin 5s 3;
	animation: spin 5s 3;
	animation: spin 5s 2s linear alternate 3; /*here we give it a timing function of linear (default is "ease") for evenly spinning animation*/
}
```

```css
/*here "spin" is the name of the animation*/
/*define the points of animation (start and end) by percentage*/
/*here in our example, it starts at 0% of the animation and the state is 0deg 
and from the end which is the 100% of the animation, the state is now 360deg*/
@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}
@-moz-keyframes spin {
	0% {
		-moz-transform: rotate(0deg);
	}
	100% {
		-moz-transform: rotate(360deg);
	}
}
@-o-keyframes spin {
	0% {
		-o-transform: rotate(0deg);
	}
	100% {
		-o-transform: rotate(360deg);
	}
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	25% {
		background-color: red;
		color: white;
	}
	50% {
		width: 500px;
	}
	75% {
		background-color: blue;
		color: yellow;
	}
	100% {
		transform: rotate(360deg);
	}
}
```

### Media Query

```css
/* #media query */

/*desktop first approach*/
/*working from small screen to large screen*/
/* rules inside this will take effect with screen width higher than 600px */
@media (min-width: 600px) {
}

/*mobile first approach*/
/*working from large screen to small screen*/
/* rules inside this will take effect with screen width lower than 600px */
@media (max-width: 600px) {
}

/*media queries with logical condition*/
/*rules inside the brackets will only take effect if
the screen is larger than the min-width and smaller than the max width*/
@media screen and (min-width: 700px) and (max-width: 1000px) {
}
```

```css
/* media types: */
/* 
screen - color computer screen
print - intended for printing
all - all devices
*/
@media screen {
}

@media all {
}

@media print {
}
```

```css
/* rules will take effect when printing */
@media print {
	#exit-print,
	.main-footer {
		display: none !important;
	}
}

/* using media query as css property */
.modal-container {
	max-height: 90vh;
	max-width: 500px;

	@media (max-width: 600px) {
		width: 90%;
	}
}
```

### FlexBox

```css
/* #flexbox */
/*first you have to create a container with display-type of flex*/
/*when you apply the display type flex to the parent element
all of its child will now be a flex items, and will correspond to its parent relatively*/
/*default state: they will stack in row left to right*/
.flex-container {
	display: flex;
	border: 1px solid #333;
	flex-wrap: wrap;
	/*nowrap is the default*/
	/*flex-wrap will wrap the element the moment they reach their minimum width*/
	/*the element will go down the next line and take up the available space (if it has a flex-grow declared on it)*/
	/*it should be put at the container of the element cause it will be the one to control its child elements*/
	/*wrapped element will stack from top to bottom*/
	flex-wrap: wrap-reverse;
	/*element will wrap in reverse*/
	/*instead of wrapped element going to the bottom new line, it will go to the top*/
	/*they will stack from bottom to top*/
	flex-direction: column;
	flex-wrap: wrap;
	flex-flow: column wrap;
	/*flex-flow is a shorthand for flex-direction & flex-wrap*/
	/*flex-flow will control the flow of the elements (axis of flex items) inside the container*/
	/*horizontal axis is the row, and the vertical axis is the column, these are the two main axis of the flex flow*/
	/*column will make the main axis go vertical, row will make it go horizontal*/
	/*when in column "flow" the flex basis will now control the min-height of the element*/
	/*the element will take the 100% width of the space if it is a block level element*/
	flex-flow: row-reverse;
	flex-flow: column-reverse;
	/*these flow value will just reverse or change the order of the element (flex items)*/
	/*note: there are two type of axis, the main and the cross axis*/
	/*there are properties that just affects the main axis or the cross axis*/
	align-items: center;
	/*align-item is one of the properties that just affect the cross axis base on the content baseline*/
}

.box {
	height: 100px;
	width: 100px;
	/*min-width: 200px;*/
	flex-grow: 1;
	/*flex-grow, this will make the element to take the available space inside the parent*/
	/*you can also give this property to one element, individually*/
	/*you can use this to make a grid of column*/
	flex-shrink: 0;
	/*flex-shrink, this determine the shrink ratio of elements (each element will shrink base on their shrink value)
	when the browser adjust in size (get smaller size)*/
	/*the heigher the shrink value/rate, the more it will get smaller*/
	/*note: the element won't shrink anymore when it reaches its minimum width*/
	flex-basis: 200px;
	/*the ratio of flex-grow & shrink is base on the flex-basis value,
	it is the point where items will start to grow & shrink*/
	/*flex-basis is like min-width, it defines a minimum width for elements*/
	/*elements will start on the given size*/
	/*wrapping behavior will be the same*/
	/*you can also apply flex-basis property on individual elements, and they will have different
	minimum sizes each*/
	/*difference between flex-basis and min-width property is that, when an element reaches its min-width it will not overflow 
	on its container instead it will shrink responsively*/
	flex: 1 1 200px;
	/*this is short hand for flex property*/
	/*values: flex-grow, flex-shrink, flex-basis*/
	flex: 1;
	/*values: flex-grow & flex-shrink = 1, flex-basis = 0 by default*/
	/* flex property is 0 by default */
	flex: 0 0 100px;
}
```

```css
/*flexbox properties*/
.flex-container {
	/*declare the flex value to deal with flexbox*/
	display: flex;
	flex-direction: row-reverse; /*reverse the stack of element*/
	flex-direction: column; /*stack in column from top to bottom*/
	flex-direction: column-reverse; /*reverse the order of the element*/
	flex-wrap: nowrap; /*(default value for flex-wrap) all element will be fit on the parent container regardless of their size*/
	flex-direction: row;
	flex-wrap: wrap; /*element will wrap (they will take the space as much as they can and stack up)*/
	flex-wrap: wrap-reverse;
	justify-content: flex-end; /*(default is flex-start) this will align the element to the end of its parent container without reversing its order*/
	align-items: stretch;
	align-items: baseline; /*will align item with the baseline of the content (e.g. fonts/paragraph)*/
	align-content: center; /*default is stretch, align-content is concern with the alignment of multiple items in the cross-axis (justify-content is the main-axis version)*/
	flex-direction: column; /*this property can affect */
	flex-grow: 0; /*the default is 0, use this to control the size ratio of element*/
	flex-basis: 30px; /*resize an element base on its direction*/
}

.flex-items {
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: auto;
	order: 1;
	flex: 1 1 auto;
	align-self: center;
}
```

```css
/*order*/
/*order is the rank in queue (row) from left-right, (column) top-bottom*/
.item:nth-child(2) {
	order: 1; /*element without given a property of order will be given the default order of "0"*/
}

.item:nth-child(2) {
	flex-grow: 2; /*will target the element and increase its size*/
}

.item:nth-child(2) {
	flex: 2 3 20px; /*shorthand for grow, shrink, basis*/
}

.item:nth-child(2) {
	align-self: flex-end; /*this will align a targeted element individually*/
}
```

### CSS Grid

```css
/* #css grid */
#grid-container {
	/*initialize grid on the parent element*/
	display: grid;

	/*grid column*/
	/*in css grid we use fraction as a unit*/
	/*grid-template-columns = specifies how many columns in grid*/
	grid-template-columns: 1fr 1fr 1fr; /*means 3 columns with 1 fraction of equal width*/
	grid-template-columns: 1fr 2fr 1fr; /*means the second column will be twice in width*/
	/*repeat function will repeat the pattern in x amount of times*/
	grid-template-columns: repeat(
		3,
		1fr
	); /*1fr repeat 3 times (1fr 1fr 1fr), giving it a 3 column grid*/

	/*grid rows*/
	/*by default grid row will follow the flow of the column in order,
	and the size of it will be dictated by its content*/
	grid-auto-rows: 200px; /*giving the row height, regardless of content*/
	grid-auto-rows: minmax(
		200px,
		auto
	); /*giving minimum and maximum height for the row, auto adjust based on content*/
	/*grid-template-rows = specifies number of rows*/
	grid-template-rows: repeat(3, 200px);
	grid-template-rows: repeat(
		3,
		minmax(200px, auto)
	); /*giving minmax height value for rows*/

	/*giving space or gap for rows & columns*/
	grid-column-gap: 10px;
	grid-row-gap: 10px;
	gap: 10px; /*shorthand for gaps*/

	/*aligning items, top or bottom*/
	align-items: start; /*align items at the start of the grid, default value is stretch*/
	/*aligning items, left or right*/
	justify-items: start;

	max-width: 960px;
	margin: 0 auto;
}

.grid-items {
	/*placing the element on the grid*/
	/*you can position elements on the grid base on grid lines,
	grid lines = forms by the start and end lines of rows and columns*/
	grid-column-start: 1; /*start placing the element at grid column line 1*/
	/*grid-column-end, will specifies the span or width of the element and where it ends on the grid line*/
	grid-column-end: 3;
	grid-column: 1 / 3; /*shorhand for column grid lines start / end lines*/
	grid-row: 2 / 4; /*shorthand for row grid lines, means start at row line 2 and end at row line 4*/
	/*another way to resize the width of an element is to use span*/
	grid-column: span 3; /*means span the element 3 columns in width*/

	/*aligning individual items*/
	align-self: start;
	justify-self: end;
}
```

```css
/*responsive grid*/
/*taking up all available space automatically*/
.grid-container {
	display: grid;

	/*auto-fill = fill all the available space with column grid*/
	grid-template-columns: repeat(auto-fill, 300px);

	/* auto-fit = create column grid only for the number of items*/
	grid-template-columns: repeat(auto-fit, 300px);

	/* using the minmax() to auto expand the size of all the items so there will be no empty space */
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-items {
	display: block;
	width: 100%;
}
```

```css
/*grid auto flow*/
/*auto flow dense, will rearrange the items to fit on available spaces*/
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	grid-auto-rows: 80px;
	grid-auto-flow: dense;
}
```

### Functions, Utilities, Snippets

```css
/*reset all*/
/*reset all property inherited by an element*/
.class {
	all: unset;
}

/*applying css rules for firefox only*/
@-moz-document url-prefix() {
	.top-header {
		height: 100px;
		padding: 32px 10px;
	}
}

/*customizing scrollbar*/
.popover-content::-webkit-scrollbar-track,
body::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #f5f5f5;
}

.popover-content::-webkit-scrollbar,
body::-webkit-scrollbar {
	width: 10px;
	background-color: #b05fdf;
}

.popover-content::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb {
	background-color: #b05fdf;
	border-radius: 5px;
}
```

```css
/* css variables */
/* define a CSS variable with -- */
:root {
	--ff: 'Montserrat', sans-serif;
	--main-color: #ff0000;
	--h1: bold 64px/72px var(--ff);
}

/* use the variable */
.element {
	color: var(--main-color);
}

/* importing css file into another css file */
@import url('reset.css');
@import url('typography.css');
@import url('layout.css');

/* basic flexbox setup */
/* list of cards with 300px max width */
.container {
	background-color: black;
	height: auto;
	display: flex;
	flex-flow: row wrap;
	gap: 10px;
}

.item {
	background-color: white;
	flex: 1 1 300px;
	max-width: 300px;
	height: 400px;
}
```

```css
/* basic responsive grid setup */
.container {
	background-color: black;
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	/* minmax will make the height of the row responsive to the height of the container minmax(min row height, max row height) */
	grid-auto-rows: minmax(20px, auto);

	/* giving the auto row value a fixed height */
	grid-auto-rows: 150px;
	gap: 10px;
}

.item {
	background-color: white;
}

.item:nth-child(1),
.item:nth-child(2),
.item:nth-child(3),
.item:nth-child(4) {
	grid-column: span 3;
}

.item:nth-child(5) {
	grid-column: span 8;
	grid-row: span 2;
}

.item:nth-child(6),
.item:nth-child(7),
.item:nth-child(8),
.item:nth-child(9) {
	grid-column: span 4;
	grid-row: span 2;
}
```

```css
/* changing the layout in mobile devices */
@media (max-width: 768px) {
	.container {
		grid-template-columns: repeat(4, 1fr);
	}
	.item:nth-child(1),
	.item:nth-child(2),
	.item:nth-child(3),
	.item:nth-child(4) {
		grid-column: span 2;
	}
	.item:nth-child(5),
	.item:nth-child(6),
	.item:nth-child(7),
	.item:nth-child(8),
	.item:nth-child(9) {
		grid-column: span 4;
	}
}
```

```css
/* creating a grid of cards with max width of 300px */
.container {
	background-color: black;
	height: auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	justify-content: center;
	gap: 10px;
}

.item {
	background-color: white;
	height: 400px;
}
```

```css
/* creating a dashboard with multiple cards */
.dashboard {
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 50vh;
}

.card {
	background-color: #1b1c1e;
	color: white;
	flex: 1;
}

.top-row,
.middle-row,
.bottom-row {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.large {
	flex: 2;
}

.middle-row {
	display: flex;
	flex: 2;
	gap: 10px;
}

.bottom-row {
	display: flex;
	flex: 1;
	gap: 10px;
}
```

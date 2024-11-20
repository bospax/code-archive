# Hypertext Markup Language

### HTML Fundamental Elements

```html
<!-- --> <!--comment tag-->
<!doctype html> <!--para malaman yung version ng html na ginamit-->
<html></html> <!--html tag-->
<head></head> <!--head tag-->
<title></title> <!--title tag-->
<meta></meta> <!--metadata tag. example: <meta charset = "utf-8"/>-->
<body></body> <!--body tag-->
<h1></h1> <!--headings-->
<p></p> <!--paragraph tag-->
<small></small> <!-- small font tag -->
<ul></ul> <!--unordered list tag-->
<ol></ol> <!--ordered list tag-->
<li></li> <!--list tag-->
<dl></dl> <!--definition list tag-->
<dt></dt> <!--definition term tag-->
<dd></dd> <!--definition detail tag-->
<strong></strong> <!--strong tag. gagawin bold letters yung word-->
<em></em> <!--emphasis tag-->
<blockquote></blockquote> <!--quote tag-->
<a></a> <!--anchor tag-->
<div></div> <!--division or container like tag-->
<table></table> <!--table tag-->
<tr></tr> <!--row tag-->
<td></td> <!--column-->
<hr></hr> <!--horizontal linebreak/rule-->
<br> <!--linebreak-->
<aside></aside> <!--side information or content-->
<footer></footer> <!--footer tag-->
<nav></nav> <!--navigation tag. parang container/division tulad ng div tag-->
<h1><span>sampletext</span></h1> <!--span tag-->
<article></article> <!--article tag-->

```

```html
<!--Let browser know website is optimized for mobile-->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<img src="imagefilename" alt="description" />
<!--picture na may description in case ndi available ung image-->

<a href="filename"></a>
<!--link tag-->
<a href="foldername/filename"></a>
<!--link folder tag-->
<a href="../filename"></a>
<!--go up to parent directory tag-->

<div id="idname"></div>
<!--identification tag. good practice to target only one element-->
<div class="classname"></div>
<!--class tag. good practice to target group element-->
```

### Styling in HTML

```html
<!--embedded stylesheet-->
<head>
	<style>
		p {
			font-family: san-serif;
		}
	</style>
</head>

<!--inlined stylesheet-->
<p style="font-family: san-serif;">sampletext</p>

<!--external stylesheet-->
<link rel="stylesheet" href="filename.css" />

<!--pixel indention-->
&nbsp;
```

### Scalable Vector Graphics

```html
<!-- svg's are scalable and customizable graphics -->

<!-- calling embedded svg -->
<!-- everything inside the svg tag are xml elements -->
<svg>
	<use href="#svgId"></use>
</svg>

<!-- creating your own svg -->
<!--
svg width & height = size of the svg viewport
svg viewport - is the size of the viewable area
svg viewbox - controls what is inside the svg viewport / viewable area
-->
<!--
viewBox="(xy coordinates) (viewBox size)"
viewBox - controls the panning and zooming of elements insided the svg viewport
basically the xy coord controls the panning
& viewBox width height controls the zooming
-->
<svg viewBox="0 0 300 300">
	<svg width="250" height="250">
		<!--
	for circle
	r = radius,
	cx & cy = coordinates axis from center,
	fill = background
	stroke = border
	stroke-width = border size
	-->
		<circle
			r="125"
			cx="125"
			cy="125"
			fill=""
			stroke="black"
			stroke-width=""
		/>

		<!--
	for rectangle
	x & y = coordinations from top and left
	rx & ry = rounded corners
	-->
		<rect rx="" ry="" x="" y="" height="" width="" />

		<!--
	svg code order: elements top to bottom = will be
	rendered back to front
	-->

		<!--
	for line
	x1 & y1 = coordinates
	x2 & y2 = starting and ending point
	-->

		<line x1="" y1="" x2="" y2="" stroke="black" stroke-width="" />

		<!--
	for polygon
	points = points coordinates of lines in polygons
	points = "x,y x,y x,y"
	polygons only for straight line and cannot be use for curves
	-->

		<polygon fill="pink" points="50,50 200,50 200,200" />
	</svg>
</svg>
```

```html
<!-- check if loading of iframe is finished -->
<iframe allowfullscreen onLoad="" />

<!-- handling image error when loading -->
<img src="" onError="" />

<!-- securing link tags -->
<!-- noopener - Prevents the newly opened tab from using JavaScript to access the window.opener object of the parent page, which can protect the referring page.
noreferrer - Ensures no referrer information is sent to the new tab (useful for privacy). -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer"
	>Visit Example</a
>
```

### Basic Form Elements

```html
<!-- Text Input (string) -->
<input type="text" id="textInput" value="Hello" />

<!-- Password Input (string) -->
<input type="password" id="passwordInput" value="secret" />

<!-- Number Input (number) -->
<input type="number" id="numberInput" value="42" />

<!-- Email Input (string) -->
<input type="email" id="emailInput" value="user@example.com" />

<!-- URL Input (string) -->
<input type="url" id="urlInput" value="https://example.com" />

<!-- Tel Input (string) -->
<input type="tel" id="telInput" value="+1234567890" />

<!-- Search Input (string) -->
<input type="search" id="searchInput" value="query" />

<!-- Textarea (string) -->

<textarea id="textArea">Multi-line text</textarea>

<!-- Checkbox (boolean) -->
<input type="checkbox" id="checkboxInput" checked />

<!-- Radio Button (boolean) -->
<input type="radio" name="exampleRadio" id="radioInput" checked />

<!-- Dropdown / Select (string) -->
<select id="dropdownSelect">
	<option value="option1">Option 1</option>
	<option value="option2" selected>Option 2</option>
</select>

<!-- Multi-select (array of strings) -->
<select id="multiSelect" multiple>
	<option value="option1" selected>Option 1</option>
	<option value="option2">Option 2</option>
	<option value="option3" selected>Option 3</option>
</select>

<!-- Range Slider (number) -->
<input type="range" id="rangeSlider" min="0" max="100" value="50" />

<!-- Date Picker (string) -->
<input type="date" id="datePicker" value="2024-01-01" />

<!-- Time Picker (string) -->
<input type="time" id="timePicker" value="12:00" />

<!-- File Upload (FileList object) -->
<input type="file" id="fileUpload" multiple />

<!-- Color Picker (string, color hex code) -->
<input type="color" id="colorPicker" value="#ff0000" />

<!-- Hidden Input (string) -->
<input type="hidden" id="hiddenInput" value="secret value" />
```

### Buttons and Clickable Elements

```html
<!-- Button (no value output, triggers an action) -->

<button id="button">Click Me</button>

<!-- Icon Button (no value output) -->

<button id="iconButton"><img src="icon.png" alt="icon" /></button>

<!-- Toggle Button (boolean) -->

<button id="toggleButton" aria-pressed="false">Toggle</button>

<!-- Link (string, URL) -->

<a href="https://example.com" id="link">Go to Example</a>

<!-- Clickable Image (no value output) -->
<img src="image.png" id="clickableImage" alt="Clickable Image" />

<!-- Floating Action Button (no value output) -->

<button id="floatingButton" class="fab">+</button>
```

### Navigation Elements

```html
<!-- Menu Item (string) -->

<a href="#section1" id="menuItem">Menu Item</a>

<!-- Navbar Link (string, URL) -->

<a href="/home" id="navbarLink">Home</a>

<!-- Sidebar Link (string, URL) -->

<a href="#sideSection" id="sidebarLink">Side Section</a>

<!-- Breadcrumb Link (string, URL) -->

<a href="/home" id="breadcrumb">Home</a>

<!-- Pagination Link (number) -->

<a href="?page=2" id="paginationLink">2</a>

<!-- Tab Button (string) -->

<button role="tab" id="tabButton">Tab 1</button>

<!-- Dropdown Menu Item (string) -->

<a href="#item1" id="dropdownMenuItem">Item 1</a>

<!-- Stepper (number) -->

<button id="stepperNext">Next Step</button>
<button id="stepperPrevious">Previous Step</button>
```

### Interactive Containers and Cards

```html
<!-- Modal Dialog (boolean) -->
<div id="modal" role="dialog" hidden>Modal Content</div>

<!-- Alert Box (string, action) -->
<div role="alert" id="alertBox">Alert Message</div>

<!-- Tooltip (string) -->

<span title="Tooltip text" id="tooltip">Hover over me</span>

<!-- Accordion (boolean) -->

<button id="accordionToggle">Section 1</button>

<div id="accordionContent" hidden>Content</div>

<!-- Carousel/Slider Controls (number) -->

<button id="carouselPrev">Previous</button>
<button id="carouselNext">Next</button>

<!-- Card (clickable, no output value) -->
<div id="clickableCard">Clickable Card</div>

<!-- Toast Notification (string) -->
<div id="toastNotification">This is a toast message</div>
```

### Media Controls

```html
<!-- Play/Pause Button (boolean) -->

<button id="playPauseButton" aria-pressed="false">Play</button>

<!-- Volume Control (number) -->
<input type="range" id="volumeControl" min="0" max="100" value="50" />

<!-- Mute/Unmute Button (boolean) -->

<button id="muteButton" aria-pressed="false">Mute</button>

<!-- Seek Slider (number) -->
<input type="range" id="seekSlider" min="0" max="100" value="0" />

<!-- Fullscreen Button (boolean) -->

<button id="fullscreenButton" aria-pressed="false">Fullscreen</button>
```

### Interactive Text

```html
<!-- Editable Text Field (string) -->
<p contenteditable="true" id="editableText">Editable Text</p>

<!-- Selectable Text (string) -->

<span id="selectableText">Selectable Text</span>

<!-- Hyperlink (string, URL) -->

<a href="https://example.com" id="hyperlink">Visit Site</a>
```

### Advanced UI Components

```html
<!-- Date Range Picker (array of strings) -->
<input type="date" id="startDate" />
<input type="date" id="endDate" />

<!-- Drag and Drop Elements (object) -->
<div id="dragItem" draggable="true">Drag Me</div>
<div id="dropZone">Drop Here</div>

<!-- Tree View (boolean per node) -->
<ul>
	<li id="treeNode1">Node 1</li>
	<li id="treeNode2">Node 2</li>
</ul>

<!-- Data Table Controls (array of strings, sort, boolean for checkbox selection) -->
<table id="dataTable">
	<thead>
		<tr>
			<th>Column 1</th>
			<th>Column 2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Data 1</td>
			<td>Data 2</td>
		</tr>
	</tbody>
</table>

<!-- Interactive Charts (object) -->

<canvas id="interactiveChart"></canvas>
```

### File and Folder Management

```html
<!-- File Selector (File object) -->
<input type="file" id="fileSelector" />

<!-- Folder Selector (Directory handle, in browsers supporting File System Access API) -->
<input type="file" id="folderSelector" webkitdirectory />
```

### Messaging and Feedback

```html
<!-- Comment Box (string) -->

<textarea id="commentBox">Enter Comment</textarea>

<!-- Rating Stars (number) -->
<div id="ratingStars" data-rating="4">★★★★☆</div>

<!-- Like/Dislike Button (boolean) -->

<button id="likeButton">Like</button>
<button id="dislikeButton">Dislike</button>
```

### Device and Browser Interactions

```js
// Geolocation (object with latitude/longitude)
navigator.geolocation.getCurrentPosition((position) => {
	console.log(position.coords.latitude, position.coords.longitude);
});

// Notification (permission status, action taken)
Notification.requestPermission().then((permission) => {
	if (permission === 'granted') {
		new Notification('Notification content');
	}
});
```

### JavaScript Example for Retrieving Values

```js
// Retrieve input value (text)
document.getElementById('textInput').value; // "Hello"

// Retrieve checkbox value (boolean)
document.getElementById('checkboxInput').checked; // true or false

// Retrieve date picker value (string)
document.getElementById('datePicker').value; // "2024-01-01"
```

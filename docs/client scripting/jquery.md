# JQuery

### Syntax & Selectors

```js
// jQuery syntax
// jQuery statement always starts with $ sign or the "jQuery" keyword
// jQuery is an array type

// jQuery wrapper
(function ($) {
	'use strict';
	// jquery code here
})(jQuery);

// native jquery wrapper
$(function () {
	'use strict';
	// jquery code here
});

// getting element in the dom
document.getElementById('page-title'); // using vanilla js

$(); // jquery element wrapper, turn the element into jquery objects
$('#page-title'); // using jquery

// result will return an array (a jquery object)
// the element is wrapped in the jquery object where you can use methods to manipulate the elements
// unwrapping the element from jquery object
var heading = $('#page-title');
heading[0]; // getting the [0]index (depending on how many elements are there in the array), and unwrapped(extract) it from the jquery object
// unwrapping(extracting) an element will remove the access to jquery methods, and you can use vanilla js methods again

// selectors
// jquery uses css selector syntax to get/select an element in the dom
$('#page-title'); // id selector
$('#page-title p'); // get element inside an element, will return an array of elements
$('.wrapper'); // class selector

// changing the style of the selected element
// syntax: $("element").css({property:"value"});
$('h3').css({ border: '3px solid black' });

// selecting the index of the element with given class
$element = $('.myclass:eq(1)');

// filters
// use to refine selectors to make them more specific
// filters always start with colon (:) like css pseudo classes
// first & last filters
$('header nav li:first').css({ border: '2px solid black' });
$('header nav li:last').css({ border: '2px solid black' });
// odd & even filters
$('header nav li:even').css({ border: '2px solid black' });
$('header nav li:odd').css({ border: '2px solid black' });

// not filter
// negate the target element
$("section:not('#contact')").css({ border: '2px solid black' });
// in this case, select all section tags not having an id of "contact"

// lessthan & greaterthan filters
$('#social-nav li:lt(3)').css({ border: '3px solid blue' }); // get a list less than the [3]index
$('#social-nav li:gt(2)').css({ border: '3px solid blue' });

// attribute filter
$('div[class]').css({ border: '2px solid black' }); // get all divs with "class" attribute
$('div[class=main-wrapper]').css({ border: '2px solid black' }); // get all divs with attribute of "class" with value of "main-wrapper"

// grabbing elements
// .next() & .prev(), get the element inline next/previous to the targeted element
$('#contact').next().css({ border: '3px solid black' });
// .parent(), grabs the element and return its parent
$('#contact').parent().css({ border: '3px solid black' });
// .children(), get the children of the targeted element
$('#contact').children().css({ border: '3px solid black' });
// .find(), find an element inside the targeted element
$('#contact').find('.facebook').css({ border: '3px solid black' });
// .closest(), get the closest element from the targeted element with the specify value
$('#contact').closest('.wrapper').css({ border: '3px solid black' });
```

### Element Modification

```js
// chaining
// ability to chain multiple methods or functions in one statement of code
$('').css({}).next().css({}).closest().css({}); // seperate it with enter to make it readable

// remove current alert and change with new alert status
$(parent3)
	.find('.alert')
	.removeClass('alert-success')
	.removeClass('alert-danger')
	.addClass('alert-success')
	.html('Your return request was already submitted.');

// adding & changing content
var tweet = "<div style='margin:20px 0; padding:10px;'>Some text here.</div>";

// grabbing the element where you want to put the new element
$('#tweets div');
$('#tweets div').append(tweet); // add the element below the element inside the targeted element
$('#tweets div').prepend(tweet); // add the element to the top of the element inside the targeted element
$('#tweets div p').before(tweet); // add element before the targeted element
$('#tweets div p').after(tweet); // add element after the targeted element
$('#tweets div').html(tweet); // replace all the content of the targeted element
$('#tweets div p').text(tweet); // change the text of the targeted element, as a text content

// wrapped elements
// wrapped elements are elements that are wrapped inside a parent element
// wrapping an element:
$('section').wrap('<div>'); // this will individually wrap all the "section" tags (targeted element) in a "div" tags

// unwrapping an element:
$('section').unwrap(); // unwrapped the targeted element from its parent (this will remove the parent of the element)

// wrapped all
$('section').wrapAll('<div>'); // this will wrap all the targeted element ("section") inside a one single specified element ("div")

// removing content
// .empty(), removes the content inside of the targeted element
$('#wrapper').empty();
// .remove(), removes the targeted element and its content completely
$('#wrapper').remove();

// attributes
// .removeAttr(), remove an attribute completely
$('#contact img').removeAttr('alt');

// .attr(), read or set an attribute
// syntax: $("targetElement").attr("attributeName","attributeValue");
$('#contact img').attr('alt', 'location');

$('#contact img').attr('alt'); // return the value of the "alt" attribute
$('img').attr('srcset', src);

// controlling the css
// getting the value
$('#contact').css('position'); // return the value of the css property of the targeted element

// changing the value
// syntax: $("targetElement").css("property","value");
$('#contact').css('top', '-200px');

// passing multiple value using object
$('#social-nav').css({
	top: '-400px',
	left: '150px',
	opacity: '0.5',
	'border-top': '4px solid red',
});

$(this).css({
	'background-image': 'url(' + background_image_url + ')',
	'background-size': 'cover',
	'background-repeat': 'no-repeat',
	'background-position': 'center',
	'min-height': container_min_height,
	'min-width': container_min_width,
	height: container_height,
	width: container_width,
});

// adding & removing classes
// removeClass(), remove class from the targeted element
// syntax: $("targetElement").removeClass("className");
$('header > div').removeClass('wrapper');

// addClass(), add class to the targeted element
$('header > div').addClass('wrapper');

// toggleClass(), toggles the class on and off on the targeted element
var button = $('#lead-banner a');

button[0].onclick = function () {
	$('#point-of-sale').toggleClass('open'); // taking in and taking away the "open" class from the targeted element
	return false; // negating the default behavior of an anchor tag (to prevent from going anywhere)
};

// changing input placeholder
$('#s').attr('placeholder', 'Type search keyword here and press enter..');
```

### Handling Events

```js
// document ready & window load event
// .on("ready"), event to check if the all the elements are loaded in the document
// .on("load"), event to check if the whole webpage(including elements and contents) are loaded
// shorthand syntax: $(function(){...});
$(document).ready(function () {
	// some code here..
});

$(window).load(function () {
	// some code here..
});

// binding events
// on(), binds an event to the targeted element
// off(), unbinds an event from the targeted element
// syntax: .on("eventType",function(){...});
var myli = $('#points-of-sale li');

myli.on('click', function () {
	$(this).css({ background: 'pink' });
	// this keyword refer to the current object/element (in this case the "li")
	// wrapping the "this" keyword in jquery wrapper($()) to access jquery methods
	myli.off('click'); // unbinding the event from the element
});

// event helpers
// shorthand notations for events
$('#lead-banner').click(function () {
	alert('you clicked me!');
});

// shorthand for events
$('#element').click();

// event object
// passing event object to a function and return information about the event
$('*').on('click', function (e) {
	// you can name your event object(in this case, "e") to whatever you like
	console.log(e.target); // return the targeted element
	console.log(e.type); // return the type of event
	console.log(e.pageX); // return the x coordinate(in pixel) where the event was fired
	e.stopPropagation(); // avoiding the expanding effect(ripple effect), so that not all elements affected by the event will return
});

// on click and disable default behavior
$('#btn').on('click', function (e) {
	e.preventDefault();

	return false;
});

$(document).on('click', '.cust-btn-del', function (e) {
	e.preventDefault();

	return false;
});
```

### Element Toggling & Behavior

```js
// animation
// syntax: $(elementName).animate({cssProperty:"value"},animationSpeed,"easingType",callbackFunction);
// callback-function, is a function that fires when something is complete
$(document).ready(function () {
	$('#lead-banner a').on('click', function () {
		$(this).animate({
			width: '500px',
			height: '100px',
		});
		// you can only animate property with numerical value
	});
});

// fading element In & Out
// syntax: fadeIn(animationSpeed);
$(document).ready(function () {
	$('#lead-banner a').on('click', function () {
		$(this).fadeOut();
		// or by chaining: $(this).fadeOut().fadeIn();
	});
});

// fadeTo();
// syntax: fadeTo(animationSpeed,opacity);
$(document).ready(function () {
	$('#lead-banner a').on('click', function () {
		$(this).fadeTo(1000, 0.2);
	});
});

// hide & show elements
// syntax: hide(speed);
$(document).ready(function () {
	$('#lead-banner a').on('click', function () {
		$(this).hide();
	});
});

// .toggle(), show or hide an element depending on its current state
$(document).ready(function () {
	$('#button').on('click', function () {
		$('#image-map').toggle();
	});
});

// sliding elements
$(document).ready(function () {
	$('.slide-button-up').on('click', function () {
		$('#banner').slideUp();
		// you can use .slideToggle(), to toggle up or down depending on element's current state
	});
});

// slide animation example
$(document).ready(function () {
	var items = $('#points-of-sale li');
	// toggle and find the p element when one of the li element was clicked
	items.click(function () {
		$(this).find('p').slideToggle(500);
	});
});

// toggle button on text changed
$('.inputQty').on('change', function () {
	$(this).siblings('.btnEdit').css('display', 'inline-block');
});

$('.btnEdit').on('click', function () {
	$(this).hide();
});

// toggling element
// scenario: expand search bar when search icon is clicked and change button icon/then hide the navigation menu
$('#p-search-btn').click(function () {
	// get this element next element (adjacent)
	$(this).next('#p-search-input').toggle('fast');

	// toggle button icon (font awesome icon)
	$(this).toggleClass('fa-search').toggleClass('fa-times');

	// toggle navigation menu show/hide
	$('.p-menu-nav-wrapper').toggle('fast');
});

// fading animation example
$(document).ready(function () {
	var allQuotes = $('#clients blockquote'); // return an array of elements(blockquote element)
	var x = 0;

	// callback function
	function nextQuote() {
		if (x == allQuotes.length - 1) {
			x = 0;
		} else {
			x++;
		}
		$(allQuotes[x]).fadeIn(200);
	}

	// change quote function
	function changeQuote() {
		$(allQuotes[x]).fadeOut(200, nextQuote); // calling the callback-function "nextQuote" to let the fadeOut() process to be complete before jumping to the next quote
	}

	// calling the function with time interval
	var timer = setInterval(changeQuote, 2000); // storing the timer into a variable to access the stop timer function if needed
});
```

### Functions & Snippets

```js
// sticky navigation
// toggle fixed-nav class
/*
	.fixed-nav {
		position: fixed;
		top: 0;
		z-index: 9999;
	}
*/
$(document).ready(function () {
	var targetPos = $('#menu-nav').offset().top; // finding the top position of the element
	// $(window).resize(function() {
	// 	targetPos = $('#menu-nav').offset().top;
	// });

	$(window).scroll(function () {
		var scrollPos = $(this).scrollTop(); // getting the scroll points of the document window
		if (scrollPos > targetPos) {
			$('#menu-nav').addClass('fixed-nav');
		} else {
			$('#menu-nav').removeClass('fixed-nav');
		}
	});
});

// changing image src value from another element
$('div.pigment').click(function () {
	// element where the image url will be retrieve
	var src = $(this).data('img-url');
	var target = $(this).data('target-id');

	// element image src that will be modified
	$(target + ' img').attr('srcset', src);
});

// copy dropdown value to another dropdown
// scenario:
// when checkbox is change copy dropdown value to another dropdown
$('#choice_5_26_1').change(function () {
	if ($(this).is(':checked')) {
		// get dropdown value
		var prov_bill = $('#input_5_17');
		prov_bill = prov_bill[0].selectedIndex;

		// reflect value to another dropdown
		$('#input_5_22')[0].selectedIndex = prov_bill;
	} else {
		// reset dropdown by selecting the first element
		$('#input_5_22').find('option:first').attr('selected', 'selected');
		var prov_ship = $('#input_5_22').val();
		console.log(prov_ship);
	}
});

// trigger an event on class change
$(document).ready(function () {
	var $div = $('.swiper-slide');

	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.attributeName === 'class') {
				var attributeValue = $(mutation.target).prop(
					mutation.attributeName
				);
				console.log('Class attribute changed to:', attributeValue);
			}
		});
	});

	observer.observe($div[0], {
		attributes: true,
	});
});

// setting and getting local storage value
$(document).ready(function () {
	if (localStorage.getItem('popState') != 'shown') {
		$('#myModal_promt').modal('show');
		localStorage.setItem('popState', 'shown');
	}
});

// adding animate.css on fullpage.js
// scenario: on page down add animation on element
$('#fullpage').fullpage({
	onLeave: function (index, destination, direction) {
		if (index == 1 && direction == 'down') {
			$('#navbar1').css('display', 'none');
			$('#navbar2').css('display', 'block');

			// get the element with is-animated classname
			var $isAnimatedSecond = $('#sect2 .is-animated');

			$isAnimatedSecond.addClass('animated fadeInDown');
			$isAnimatedSecond.eq(0).css('animation-delay', '.3s');
			$isAnimatedSecond.eq(1).css('animation-delay', '.3s');
			$isAnimatedSecond.eq(2).css('animation-delay', '.9s');
		}
	},
});

// changing value of text from dropdown value
// spliting dropdown selected value
$(document).on('change', '#shipping__postcode', function (event) {
	event.preventDefault();

	var val = $('option:selected', this).val();
	var postcode = $('#shipping_postcode');
	var result = val.split(',');

	var code = result[0];

	postcode.val(code);
	postcode.change();
});

// set get value on href
$('#locationfilter').on('change', function () {
	var location = $(this).val();
	window.location.href = '?location=' + location;
});

// change attribute value (data attribute)
$('#btn-add-driver').attr('data-type', 'edit');

// get the data from table row with class into the input field
var dname = $(this).parent().siblings('.dname').text();
var dnum = $(this).parent().siblings('.dnum').text();

$('#input-driver-name').val(dname);
$('#input-driver-number').val(dnum);

// parsing json data into object
var response = JSON.parse(response);

// convert array into string
var errors = response['msg'].toString();

// remove all char except numbers and decimal point
variable.replace(/[^\d\.]/g, '');

// Disable right click and f12
$('html').on('contextmenu', function (e) {
	return false;
});

// Prevent F12
$(document).keydown(function (event) {
	if (event.keyCode == 123) {
		return false;
	} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
		// Prevent Ctrl+Shift+I
		return false;
	}
});

// save checkbox value into array
var permissions = [];

$('input[name="permissions[]"]:checked').each(function (i) {
	permissions[i] = $(this).val();
});

console.log(permissions);

// format number on keyup
$('input[name="input-consump-cost"]').keyup(function (event) {
	// skip for arrow keys
	if (event.which >= 37 && event.which <= 40) return;

	// format number
	$(this).val(function (index, value) {
		return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	});
});

// multiple checkboxes
// with checkbox "all" and others
$(document).on('change', '#chk-all', function (e) {
	// check if "all" is checked
	if ($(this).is(':checked')) {
		// check all other checkboxes
		$('input[name="permissions[]"]').each(function (i) {
			$(this).prop('checked', true);
		});
	} else {
		// uncheck all checkboxes
		$('input[name="permissions[]"]').each(function (i) {
			$(this).prop('checked', false);
		});
	}
});

// when other checkboxes not equal to "all"
$(document).on(
	'change',
	"input[name='permissions[]']:not('#chk-all')",
	function (e) {
		var all = true;

		// if checkbox is uncheck
		if (!$(this).is(':checked')) {
			// uncheck the "all" checkbox
			$('#chk-all').prop('checked', false);
		}

		// loop through other checkboxes not equal to "all"
		$("input[name='permissions[]']:not('#chk-all')").each(function (i) {
			// if one of this is uncheck all identifier will be false
			if (!$(this).is(':checked')) {
				all = false;
			}
		});

		// if all identifier is true, check the "all" checkbox
		if (all) {
			$('#chk-all').prop('checked', true);
		}
	}
);

// animate each list item with delay
// code in style sheet
// @keyframes FadeIn {
// 	0% {
// 		opacity: 0;
// 	}

// 	40% {
// 		opacity: .4;
// 	}

// 	80% {
// 		opacity: .8;
// 	}

// 	100% {
// 		opacity: 1;
// 	}
// }

// .myClass li {
// 	animation: FadeIn 1s linear;
// 	animation-fill-mode: both;
// }

$(document).ready(function () {
	ctr = 1;
	delay = 0.2;

	$('ul li.show').each(function (i) {
		console.log(ctr);

		$('.myClass li:nth-child(' + ctr + ')').css({
			'animation-delay': delay + 's',
		});

		ctr++;
		delay += 0.2;
	});
});

// highlight table row on clicked
// css style:
// .table tbody tr.highlight td {
// 	background-color: #f4f4f4;
// }
$('#table-location').on('click', 'tbody tr', function (event) {
	$(this).addClass('highlight').siblings().removeClass('highlight');
});

// nested swal alert with input field and confirmation
function deleteEmployee(id) {
	let vm = this;

	Swal.fire({
		title: '<span style="color: red;">WARNING: If you proceed, All data associated with this Employee will be permanently deleted.</span>',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Proceed',
		showLoaderOnConfirm: true,
		preConfirm: () => {
			vm.swalLoader(); // Show loader while processing
			return Swal.fire({
				title: 'Type "DELETE" to confirm:',
				input: 'text',
				inputAttributes: {
					autocapitalize: 'off',
				},
				showCancelButton: true,
				confirmButtonText: 'Confirm',
				showLoaderOnConfirm: true,
				preConfirm: (inputValue) => {
					if (inputValue === 'DELETE') {
						// console.log('delete request');
						return axios
							.delete(`api/employees/${id}`)
							.then((res) => {
								if (res.data.success) {
									// Remove the deleted employee from local state
									vm.employees = vm.employees.filter(
										(employee) => employee.id !== id
									);
									vm.getTotalItems(); // Update any counts or totals
									vm.employeeData.selectedEmployee = {
										id: '',
										full_id_number_full_name: '',
									}; // Reset selected employee
									Swal.fire({
										icon: 'success',
										text: 'Employee successfully deleted!',
									});
								} else {
									// Inform user if deletion was unsuccessful
									Swal.fire({
										icon: 'error',
										text: 'Failed to delete employee. Please try again later.',
									});
								}
							})
							.catch((err) => {
								console.error(err);
								// Handle error gracefully
								Swal.fire({
									icon: 'error',
									text: 'An error occurred while deleting the employee. Please try again later.',
								});
							});
					} else {
						// Inform user if input was incorrect
						Swal.showValidationMessage(
							'Input does not match. Please type "DELETE" to confirm.'
						);
					}
				},
				allowOutsideClick: () => !Swal.isLoading(),
			});
		},
		allowOutsideClick: () => !Swal.isLoading(),
	}).then((result) => {});
}
```

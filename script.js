/*
	Add the necessary code to wait for the DOM to load to make sure that anything you 
	manipulate in the DOM has loaded. You can do this either using window.onload or 
	adding an event listener for DOMContentLoaded.
*/

document.addEventListener('DOMContentLoaded', function() {

	//Replace the text "Change me" with "Hello World!".
	let h1 = document.getElementById('change_heading');
	h1.innerText = 'Hello World!';

	// When a user hovers over one of the colored boxes change the 
	// text to display the color that is being hovered over.
	let coloredBoxes = document.querySelectorAll('section div');
	for (let i = 0; i < coloredBoxes.length; i++) {
		coloredBoxes[i].addEventListener('mouseover', function() {
			if (coloredBoxes[i].innerText == '') {
				coloredBoxes[i].innerText = coloredBoxes[i].classList[0];
			} else {
				coloredBoxes[i].innerText = '';
			}	
			
		});
	}

	// Create a new div element.
	let newDiv = document.createElement('div');

	// Give your new div a class of purple and style it so that it has a
	// background color of purple.
	newDiv.classList.add('purple');

	//Append your new div to the page to the section tag.
	let section = document.querySelector('section');
	section.appendChild(newDiv);



});
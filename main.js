// Cache references to DOM nodes.
const siteWrapper = document.querySelector('.wrapper');
const hamburgerMenuButton = document.querySelector('nav span');
const slideoutCloseButton = document.querySelector('#slideoutCloseButton');

function openSlideoutDrawer () {
  console.log('do it');
	siteWrapper.classList.add('slideout-open');
	slideoutCloseButton.focus();
}

function closeSlideoutDrawer () {
	siteWrapper.classList.remove('slideout-open');	
	hamburgerMenuButton.focus();
}

// Bind event listeners.
window.onload = () => {
  hamburgerMenuButton.addEventListener('click', openSlideoutDrawer, false);
  slideoutCloseButton.addEventListener('click', closeSlideoutDrawer, false);
}

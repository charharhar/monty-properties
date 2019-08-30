import '../css/projects.css';
import {
  scrollTo,
  hotReload,
  sliceArray,
  mobileNavHandler,
} from '../helpers/util.js'

/**
 * Moible Nav Handler
 */
// const hamburger = document.querySelector('.hamburger');
// const mobileNavList = document.querySelector('.mobile-nav-list');

// mobileNavHandler(hamburger, mobileNavList);

/**
 * Event Listeners
 */
const modalControl = sliceArray(document.querySelectorAll('.modal-control'))

modalControl.forEach(node => {
  node.addEventListener('click', e => {
    const message = node.getAttribute('data-message');
    const targetId = node.getAttribute('data-target');

    const target = document.querySelector(`#${targetId}`);

    target.classList.toggle('modal-active')
  })
})

window.addEventListener('load', function(e) {
})

hotReload();

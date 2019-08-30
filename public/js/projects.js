import '../css/projects.css';
import {
  scrollTo,
  hotReload,
  sliceArray,
  mobileNavHandler,
  slickHelper,
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
const carouselInitWrappers = sliceArray(document.querySelectorAll('.carousel-init-wrapper'))
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
  carouselInitWrappers.forEach(node => {
    const nodeId = node.getAttribute('id');
    slickHelper(`#${nodeId}`);
  })
})

hotReload();

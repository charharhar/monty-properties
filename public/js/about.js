
import '../css/about.css';
import {
  hotReload,
  sliceArray,
  findParent,
  scrollTo,
  slickHelper,
} from '../helpers/util.js'

// const carousel = new Carousel('#about-media-carousel', '#about-context-carousel')

// carousel.init();

/**
 * Event Listeners
 */

document.querySelector('#footer-sideways').addEventListener('click', e => {
  scrollTo(e, '.about-section-header')
})
window.addEventListener('load', function(e) {
  slickHelper('#about-media-carousel', {
    asNavFor: '#about-context-carousel',
  });

  slickHelper('#about-context-carousel', {
    asNavFor: '#about-media-carousel',
  });
})

hotReload();

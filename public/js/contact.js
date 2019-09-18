
import '../css/contact.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import {
  scrollTo,
  hotReload,
  mobileNavHandler,
  timelineHelper
} from '../helpers/util.js'

const helpers = timelineHelper

/**
 * Moible Nav Handler
 */
const hamburger = document.querySelector('.hamburger');
const mobileNavList = document.querySelector('.main-navigation');

mobileNavHandler(hamburger, mobileNavList);

/**
 * Event Listeners
 */

document.querySelector('#footer-sideways').addEventListener('click', e => {
  scrollTo(e, '.contact-section-header')
})

window.addEventListener('load', function(e) {
  const mediaTweens = helpers.tweenMedia('#mediaA1 .media-overlay', '#mediaA1 .media')
})

hotReload();

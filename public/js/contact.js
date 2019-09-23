
import '../css/contact.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
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
 * Scrollmagic Handler
 */
const controller = new ScrollMagic.Controller();

/**
 * Event Listeners
 */

document.querySelector('#footer-sideways').addEventListener('click', e => {
  scrollTo(e, '.contact-section-header')
})

window.addEventListener('load', function(e) {
  const mediaTweens = helpers.tweenMedia('#mediaA1 .media-overlay', '#mediaA1 .media')

  controller.addScene([
    new ScrollMagic.Scene({
      reverse: true,
      triggerElement: '.contact-section-one',
    }).setClassToggle('.main-navigation', 'sticky')
  ])
})

hotReload();

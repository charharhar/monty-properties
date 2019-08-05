
import '../css/home.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import {
  hotReload,
  mobileNavHandler
} from '../helpers/util.js'

/**
 * Moible Nav Handler
 */
const hamburger = document.querySelector('.hamburger');
const mobileNavList = document.querySelector('.mobile-nav-list');

mobileNavHandler(hamburger, mobileNavList);

/**
 * Sideways CSS handler
 */
function handleHeaderSideways() {
  const navHeight = document.querySelector('.main-navigation').clientHeight;
  const headerHeight = document.querySelector('.section-header').clientHeight;
  const sidewaysHeight = headerHeight - navHeight - (headerHeight * .07);
  const sidewaysRight = document.querySelector('.navigation-list-wrapper ul').getBoundingClientRect().right - 15;

  document.querySelector('#header-sideways').setAttribute('style', `height: ${sidewaysHeight}px;left: ${sidewaysRight}px;`)
}

/**
 * Scroll Magic Handlers
 */

const sceneClassToggleGenerator = (trigger, target, classToggle, controller) => (
  new ScrollMagic.Scene({
    triggerElement: trigger,
    reverse: false,
  }).setClassToggle(target, classToggle).addTo(controller)
);

const homeController = new ScrollMagic.Controller();

const textA1 = sceneClassToggleGenerator('.home-section-one', '#textA1', 'show', homeController)
const textA2 = sceneClassToggleGenerator('.home-section-one', '#textA2', 'show', homeController)
const textA3 = sceneClassToggleGenerator('.home-section-one', '#textA3', 'show', homeController)

const mediaB1 = sceneClassToggleGenerator('.home-section-two', '#mediaB1', 'show', homeController)
const textB2 = sceneClassToggleGenerator('.home-section-two', '#textB2', 'show', homeController)
const textB3 = sceneClassToggleGenerator('.home-section-two', '#textB3', 'show', homeController)

const mediaC1 = sceneClassToggleGenerator('.home-section-three', '#mediaC1', 'show', homeController)
const textC2 = sceneClassToggleGenerator('.home-section-three', '#textC2', 'show', homeController)
const textC3 = sceneClassToggleGenerator('.home-section-three', '#textC3', 'show', homeController)

const mediaD1 = sceneClassToggleGenerator('.home-section-four', '#mediaD1', 'show', homeController)
const textD2 = sceneClassToggleGenerator('.home-section-four', '#textD2', 'show', homeController)
const textD3 = sceneClassToggleGenerator('.home-section-four', '#textD3', 'show', homeController)

/**
 * Google maps handler
 */

const GOOGLE_MAPS_STYLE = []

const MAP_OPTIONS = {
  map_id: '#monty-prop',
  center: { lat: 22.322030, lng: 114.207830 },
  zoom: 16,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: GOOGLE_MAPS_STYLE,
}

function initMap(options) {
  const { map_id, center, zoom, markers } = options;
  const map = new google.maps.Map(document.querySelector(map_id), options);
}

/**
 * Event Listeners
 */

window.addEventListener('resize', e => {
  handleHeaderSideways();
})

window.addEventListener('load', function(e) {
  handleHeaderSideways()

  initMap(MAP_OPTIONS)
})

hotReload();

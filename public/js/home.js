
import '../css/home.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import {
  hotReload,
  mobileNavHandler
} from './util.js'

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

const textAA = sceneClassToggleGenerator('.home-section-one', '#textAA', 'show', homeController)
const textAB = sceneClassToggleGenerator('.home-section-one', '#textAB', 'show', homeController)
const textAC = sceneClassToggleGenerator('.home-section-one', '#textAC', 'show', homeController)

const sceneAA = sceneClassToggleGenerator('.home-section-two', '#home-media-two', 'show', homeController)
const sceneAB = sceneClassToggleGenerator('.home-section-two', '#home-text-two', 'show', homeController)

const sceneBA = sceneClassToggleGenerator('.home-section-three', '#home-media-three', 'show', homeController)
const sceneBB = sceneClassToggleGenerator('.home-section-three', '#home-text-three', 'show', homeController)

const sceneCA = sceneClassToggleGenerator('.home-section-four', '#home-media-four', 'show', homeController)
const sceneCB = sceneClassToggleGenerator('.home-section-four', '#home-text-four', 'show', homeController)

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


import '../css/home.css';
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

window.addEventListener('resize', e => {
  handleHeaderSideways();
})

window.addEventListener('load', function(e) {

  handleHeaderSideways()

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

  initMap(MAP_OPTIONS)
})

hotReload();

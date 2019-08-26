
import '../css/contact.css';
import {
  scrollTo,
  hotReload,
} from '../helpers/util.js'

/**
 * Event Listeners
 */

document.querySelector('#footer-sideways').addEventListener('click', e => {
  console.log('?')
  scrollTo(e, '.contact-section-header')
})

window.addEventListener('load', function(e) {
})

hotReload();


module.exports = function(fileName) {
  return `import '../css/${fileName}.css';
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

window.addEventListener('load', function(e) {
})

hotReload();
`
}

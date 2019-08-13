
import '../css/about.css';
import {
  hotReload,
  sliceArray,
  findParent,
} from '../helpers/util.js'

/**
 * Carousel Handler
 */

class Carousel {
  constructor(mediaElem, contextElem) {
    const _ = this;

    _.sliderMediaNode = document.querySelector(mediaElem);
    _.sliderContextNode = document.querySelector(contextElem);
    _.nextNode = document.querySelector('#nextSlide');
    _.dotsNode = null;

    _.slidesMedia = null;
    _.slidesContext = null;
    _.dots = null;

    _.slideBaseClass = null;
    _.dotsBaseClass = null;

    _.slidesCount = 0;
    _.currentSlide = 0;
  }

  init() {
    const _ = this;

    _.slidesMedia = sliceArray(_.sliderMediaNode.children)
    _.slidesContext = sliceArray(_.sliderContextNode.children)

    _.slidesMedia.forEach((node, index) => {
      node.setAttribute('data-slide-index', index)
    })

    _.slidesCount = _.slidesMedia.length;

    _.slideBaseClass = 'carousel-slide';
    _.slidesMedia[0].className = `${_.slideBaseClass} active`;
    _.slidesContext[0].className = `${_.slideBaseClass} active`;
    _.dotsBaseClass = 'carousel-dots';

    _.buildDots();

    _.dotsNode.addEventListener('click', e => {
      carousel.changeSlide(e.target)
    })
    _.nextNode.addEventListener('click', e => {
      let target = e.target;
      if (!target.getAttribute('data-message')) {
        target = findParent(target, 'nextSlide')
      }
      carousel.changeSlide(target)
    })
  }

  buildDots() {
    const _ = this;
    let dotsWrapper;

    dotsWrapper = document.createElement('ul')
    dotsWrapper.className = 'carousel-dots-wrapper';

    for (let index = 0; index < _.slidesCount; index++) {
      let dot = document.createElement('li')
      dot.className = 'carousel-dots';
      dot.setAttribute('data-slide-index', index)
      dot.setAttribute('data-message', 'index')
      dotsWrapper.appendChild(dot);
    }

    dotsWrapper.firstElementChild.className += ' active';
    _.dots = sliceArray(dotsWrapper.children)
    _.dotsNode = dotsWrapper
    _.sliderContextNode.appendChild(dotsWrapper);
  }

  changeSlide(target) {
    const _ = this;
    const querySlide = _.currentSlide + 1;
    let dataMessage = target.getAttribute('data-message');
    let nextSlide;

    switch (dataMessage) {
      case 'next':
        nextSlide = (querySlide == _.slidesCount) ? 0 : querySlide;
        break;

      case 'index':
        nextSlide = parseInt(target.getAttribute('data-slide-index'));
        break;

      default:
        return;
    }

    _.slidesMedia[_.currentSlide].className = _.slideBaseClass;
    _.slidesMedia[nextSlide].className = `${_.slideBaseClass} active`;
    _.slidesContext[_.currentSlide].className = _.slideBaseClass;
    _.slidesContext[nextSlide].className = `${_.slideBaseClass} active`;
    _.dots[_.currentSlide].className = _.dotsBaseClass
    _.dots[nextSlide].className = `${_.dotsBaseClass} active`;

    _.currentSlide = nextSlide
  }
}

const carousel = new Carousel('#about-media-carousel', '#about-context-carousel')

carousel.init();

/**
 * Event Listeners
 */

window.addEventListener('load', function(e) {
})

hotReload();

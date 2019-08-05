
import '../css/home.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import {
  scrollTo,
  hotReload,
  mobileNavHandler,
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

const timelineMaster = {
  helpers: {
    tweenText: function(text) {
      const textTween = TweenMax.fromTo(text, 1.3, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })

      return textTween
    },
    tweenAnchor: function(text, chevron, underline) {
      const tweenArray = []
      const textTween = TweenMax.fromTo(text, .5, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })
      const chevronTween = TweenMax.fromTo(chevron, .5, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })
      let underlineTween;

      tweenArray.push(textTween, chevronTween);

      if (underline) {
        underlineTween = TweenMax.fromTo(underline, .5, { width: 0, transformOrigin: '50% 100%' }, { width: '100%' })

        tweenArray.push(underlineTween)
      }

      return tweenArray;
    },
    tweenMedia: function(overlay, media) {
      const overlayTween = TweenMax.fromTo(overlay, 1.3, { xPercent: -101 }, { xPercent: 101, ease: Power3.easeInOut });
      const mediaTween = TweenMax.fromTo(media, 1, { autoAlpha: 0 }, { autoAlpha: 1 });

      return [overlayTween, mediaTween];
    },
  },
  timelineA: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenText,
          tweenAnchor,
        }
      } = timelineMaster;

      timeline
        .add(tweenText('#textA1'), 'labelA')
        .add(tweenText('#textA2'), 'labelA+=.4')
        .add(tweenText('#textA3'), 'labelA+=.8')
        .add(tweenAnchor(
          '#anchorA4 .monty-link-text',
          '#anchorA4 .monty-link-chevron',
          '#anchorA4 .monty-link-underline'), 'labelA+=1.2', 'sequence')

      return timeline;
    },
  },

  timelineB: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
        }
      } = timelineMaster;

      timeline
        .add(tweenMedia(
          '#mediaB1 .media-overlay',
          '#mediaB1 .media'), 'labelB')
        .add(tweenText('#textB2'), 'labelB+=.4')
        .add(tweenText('#textB3'), 'labelB+=.8')
        .add(tweenAnchor(
          '#anchorB4 .monty-link-text',
          '#anchorB4 .monty-link-chevron',
          '#anchorB4 .monty-link-underline'), 'labelB+=1.2', 'sequence')

      return timeline;
    },
  },

  timelineC: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
        }
      } = timelineMaster;

      timeline
        .add(tweenMedia(
          '#mediaC1 .media-overlay',
          '#mediaC1 .media'), 'labelC')
        .add(tweenText('#textC2'), 'labelC+=.4')
        .add(tweenText('#textC3'), 'labelC+=.8')
        .add(tweenAnchor(
          '#anchorC4 .monty-link-text',
          '#anchorC4 .monty-link-chevron',
          '#anchorC4 .monty-link-underline'), 'labelC+=1.2', 'sequence')

      return timeline;
    },
  },

  timelineD: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
        }
      } = timelineMaster;

      timeline
        .add(tweenMedia(
          '#mediaD1 .media-overlay',
          '#mediaD1 .media'), 'labelD')
        .add(tweenText('#textD2'), 'labelD+=.4')
        .add(tweenText('#textD3'), 'labelD+=.8')
        .add(tweenAnchor(
          '#anchorD4 .monty-link-text',
          '#anchorD4 .monty-link-chevron',
          '#anchorD4 .monty-link-underline'), 'labelD+=1.2', 'sequence')

      return timeline;
    },
  },

  timelineL: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenAnchor,
        }
      } = timelineMaster;

      const sidewaysTextTween = TweenMax.fromTo('#header-sideways .scrollhint-underline', 1, { height: 0 }, { height: '100%' })
      const heroLineTween = TweenMax.fromTo('.hero-content .hero-border', .6, { height: 0, transformOrigin: '0 0'  }, { height: '100%' })
      const heroTextTween = TweenMax.fromTo('.hero-content h1', 1, { xPercent: -100 }, { xPercent: 0 });

      timeline
        .add([heroLineTween, sidewaysTextTween], 'labelL')
        .add(tweenAnchor(
          '#header-sideways .monty-link-text',
          '#header-sideways .monty-link-chevron'), 'labelL+=.4', 'sequence')
        .add(heroTextTween, 'labelL+=.4')
        .add(tweenAnchor(
          '#anchorL1 .monty-link-text',
          '#anchorL1 .monty-link-chevron',
          '#anchorL1 .monty-link-underline'), 'labelL+=.8', 'sequence')

      return timeline;
    }
  },

  timelineF: {
    timeline: new TimelineMax(),
    init: function() {
      const { timeline } = this;
      const {
        helpers: {
          tweenAnchor,
        }
      } = timelineMaster;

      const sidewaysTextTween = TweenMax.fromTo('#footer-sideways .scrollhint-underline', 1, { height: 0 }, { height: '100%' })

      timeline
        .add(sidewaysTextTween, 'labelF')
        .add(tweenAnchor(
          '#footer-sideways .monty-link-text',
          '#footer-sideways .monty-link-chevron'), 'labelF+=.4', 'sequence')

      return timeline;
    }
  },
}

const homeController = new ScrollMagic.Controller({
  globalSceneOptions: { reverse: false }
});

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
 * Carousel Handler
 */

const carousel = document.querySelector('#home-carousel');


/**
 * Event Listeners
 */

window.addEventListener('resize', e => {
  handleHeaderSideways();
})

window.onload = function() {
  homeController.addScene([
    new ScrollMagic.Scene({ triggerElement: '.home-section-one' }).setTween(timelineMaster.timelineA.init()),
    new ScrollMagic.Scene({ triggerElement: '.home-section-two' }).setTween(timelineMaster.timelineB.init()),
    new ScrollMagic.Scene({ triggerElement: '.home-section-three' }).setTween(timelineMaster.timelineC.init()),
    new ScrollMagic.Scene({ triggerElement: '.home-section-four' }).setTween(timelineMaster.timelineD.init()),
    new ScrollMagic.Scene({ triggerElement: '.home-section-header' }).setTween(timelineMaster.timelineL.init()),
    new ScrollMagic.Scene({ triggerElement: '.home-section-four' }).setTween(timelineMaster.timelineF.init()),
  ])
}

document.querySelector('#footer-sideways').addEventListener('click', e => {
  scrollTo(e, '.home-section-header')
})

document.querySelector('#header-sideways').addEventListener('click', e => {
  scrollTo(e, '.home-section-one')
})

window.addEventListener('load', function(e) {
  handleHeaderSideways()

  initMap(MAP_OPTIONS)
})

hotReload();

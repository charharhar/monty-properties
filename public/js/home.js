
import '../css/home.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import {
  scrollTo,
  hotReload,
  sliceArray,
  findParent,
  buildTimeline,
  mobileNavHandler,
  slickHelper,
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
  const responsiveWidth = window.innerWidth;

  const navHeight = document.querySelector('.main-navigation').clientHeight;
  const headerHeight = document.querySelector('.section-header').clientHeight;
  const heroHeight = document.querySelector('.hero-content').getBoundingClientRect().bottom;

  const sidewaysHeight = responsiveWidth <= 576
    ? window.innerHeight - heroHeight
    : headerHeight - navHeight - (headerHeight * .07);
  const sidewaysRight = responsiveWidth <= 768
    ? 'auto'
    : `${document.querySelector('.navigation-list-wrapper ul').getBoundingClientRect().right - 15}px`;

  document.querySelector('#header-sideways').setAttribute('style', `height:${sidewaysHeight}px;left:${sidewaysRight};`)
}

/**
 * Scroll Magic Handlers
 */

const timelineMaster = {
  helpers: {
    newTimeline: () => new TimelineMax(),
    tweenText: function(text) {
      const textTween = TweenMax.fromTo(text, 1.3, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })

      return textTween
    },
    tweenAnchor: function(text, chevron) {
      const tweenArray = []
      const textTween = TweenMax.fromTo(text, .5, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })
      const chevronTween = TweenMax.fromTo(chevron, .5, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeInOut })
      let underlineTween;

      return [textTween, chevronTween];
    },
    tweenMedia: function(overlay, media) {
      const overlayTween = TweenMax.fromTo(overlay, 1.3, { xPercent: -101 }, { xPercent: 101, ease: Power3.easeInOut });
      const mediaTween = TweenMax.fromTo(media, 1, { autoAlpha: 0 }, { autoAlpha: 1 });

      return [overlayTween, mediaTween];
    },
  },
  timelineA: {
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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
    init: function() {
      const {
        helpers: {
          tweenText,
          tweenMedia,
          tweenAnchor,
          newTimeline,
        }
      } = timelineMaster;
      const timeline = newTimeline();

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

});

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
  slickHelper('#home-carousel');
})

hotReload();

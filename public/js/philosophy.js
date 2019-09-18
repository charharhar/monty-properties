import '../css/philosophy.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import {
  scrollTo,
  hotReload,
  sliceArray,
  mobileNavHandler,
  slickHelper,
  timelineHelper,
} from '../helpers/util.js'

/**
 * Moible Nav Handler
 */
const hamburger = document.querySelector('.hamburger');
const mobileNavList = document.querySelector('.main-navigation');

mobileNavHandler(hamburger, mobileNavList);

/**
 * Scroll Magic Handlers
 */

const timelineMaster = {
  helpers: timelineHelper,
  timelineA: function() {
    const {
      helpers: {
        tweenText,
        tweenMedia,
        tweenAnchor,
        newTimeline,
      }
    } = timelineMaster;
    const timeline = new TimelineMax();

    timeline
      .add(tweenText('#textA1'), 'labelA')

    return timeline;
  },

  timelineB1: function() {
    const {
      helpers: {
        tweenText,
        tweenMedia,
        tweenAnchor,
        newTimeline,
      }
    } = timelineMaster;
    const timeline = new TimelineMax();

    timeline
      .add([
        TweenMax.fromTo('#philB1 .context-number', .6, { autoAlpha: 0 }, { autoAlpha: 1 }),
        tweenText('#philB1 .context-header .body-text'),
        tweenText('#philB1 .context-body .body-text'),
      ], 'labelB1')
      .add(tweenMedia(
        '#mediaB1 .media-overlay',
        '#mediaB1 .media'), 'labelB1')


    return timeline;
  },

  timelineB2: function() {
    const {
      helpers: {
        tweenText,
        tweenMedia,
        tweenAnchor,
        newTimeline,
      }
    } = timelineMaster;
    const timeline = new TimelineMax();

    timeline
      .add([
        TweenMax.fromTo('#philB2 .context-number', .6, { autoAlpha: 0 }, { autoAlpha: 1 }),
        tweenText('#philB2 .context-header .body-text'),
        tweenText('#philB2 .context-body .body-text'),
      ], 'labelB2')
      .add(tweenMedia(
        '#mediaB2 .media-overlay',
        '#mediaB2 .media'), 'labelB2')

    return timeline;
  },

  timelineB3: function() {
    const {
      helpers: {
        tweenText,
        tweenMedia,
        tweenAnchor,
        newTimeline,
      }
    } = timelineMaster;
    const timeline = new TimelineMax();

    timeline
      .add([
        TweenMax.fromTo('#philB3 .context-number', .6, { autoAlpha: 0 }, { autoAlpha: 1 }),
        tweenText('#philB3 .context-header .body-text'),
        tweenText('#philB3 .context-body .body-text'),
      ], 'labelB3')
      .add(tweenMedia(
        '#mediaB3 .media-overlay',
        '#mediaB3 .media'), 'labelB3')

    return timeline;
  },

  timelineCTA: function() {
    const {
      helpers: {
        tweenText,
        tweenMedia,
        tweenAnchor,
        newTimeline,
      }
    } = timelineMaster;
    const timeline = new TimelineMax();

    timeline
      .add([
        TweenMax.fromTo('#projects-anchor', 1, { autoAlpha: 0, x: -100, y: -100 }, { autoAlpha: 1, x: 0, y: 0 }),
        TweenMax.fromTo('#contact-anchor', 1, { autoAlpha: 0, x: 100, y: 100 }, { autoAlpha: 1, x: 0, y: 0 })
      ], 'labelCTA')
      .add(tweenText('#textCTA2'), 'labelCTA+=.5')
      .add(tweenText('#textCTA3'), 'labelCTA+=.5')
      .add(tweenAnchor(
        '#anchorCTA2 .monty-link-text',
        '#anchorCTA2 .monty-link-chevron',
        '#anchorCTA2 .monty-link-underline'), 'labelCTA+=.5', 'sequence')
      .add(tweenAnchor(
        '#anchorCTA3 .monty-link-text',
        '#anchorCTA3 .monty-link-chevron',
        '#anchorCTA3 .monty-link-underline'), 'labelCTA+=.5', 'sequence')

    return timeline;
  },
}

const controller = new ScrollMagic.Controller();

/**
 * Event Listeners
 */
window.addEventListener('load', function(e) {
  controller.addScene([
    new ScrollMagic.Scene({ triggerElement: '.philosophy-section-one' }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({ triggerElement: '#philB1' }).setTween(timelineMaster.timelineB1()),
    new ScrollMagic.Scene({ triggerElement: '#philB2' }).setTween(timelineMaster.timelineB2()),
    new ScrollMagic.Scene({ triggerElement: '#philB3' }).setTween(timelineMaster.timelineB3()),
    new ScrollMagic.Scene({
      triggerElement: '.cta-section .content-wrapper',
      triggerHook: 1,
    }).setTween(timelineMaster.timelineCTA()),
  ])
})

hotReload();

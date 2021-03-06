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
      .fromTo('#mediaB1', 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }, 'labelB1')

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
      .fromTo('#mediaB2', 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }, 'labelB2')

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
      .fromTo('#mediaB3', 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }, 'labelB3')

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
        TweenMax.fromTo('#projects-anchor', 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }),
        TweenMax.fromTo('#contact-anchor', 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 })
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
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.philosophy-section-one',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#philB1',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineB1()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#philB2',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineB2()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#philB3',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineB3()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.cta-section .content-wrapper',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineCTA()),

    new ScrollMagic.Scene({
      reverse: true,
      triggerElement: '#philB3',
    }).setClassToggle('.main-navigation', 'sticky')
  ])
})

hotReload();

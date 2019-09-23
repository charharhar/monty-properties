
import '../css/about.css';
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
      .add(tweenText('#textA2'), 'labelA+=.4')
      .add(tweenText('#textA3'), 'labelA+=.8')

    return timeline;
  },

  timelineB: function() {
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
      .add(tweenMedia(
        '#mediaB1 .media-overlay',
        '#mediaB1 .media'), 'labelB')
      .add(tweenText('#textB2'), 'labelB+=.4')
      .add(tweenText('#textB3'), 'labelB+=.8')

    return timeline;
  },

  timelineC: function() {
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
      .add(tweenText('#textC1'), 'labelC')
      .add(tweenMedia(
        '#mediaC2 .media-overlay',
        '#mediaC2 .media'), 'labelC+=.4')
      .fromTo('#mediaC3', .5, { autoAlpha: 0, marginTop: 100 }, { autoAlpha: 1, marginTop: 0 })

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
document.querySelector('#footer-sideways').addEventListener('click', e => {
  scrollTo(e, '.about-section-header')
})

window.addEventListener('load', function(e) {
  controller.addScene([
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.about-section-one',
    }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.about-section-two',
    }).setTween(timelineMaster.timelineB()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.about-section-three',
    }).setTween(timelineMaster.timelineC()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.cta-section .content-wrapper',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineCTA()),

    new ScrollMagic.Scene({
      reverse: true,
      triggerElement: '.about-section-three',
    }).setClassToggle('.main-navigation', 'sticky')
  ])

  slickHelper('#about-media-carousel', {
    asNavFor: '#about-context-carousel',
  });

  slickHelper('#about-context-carousel', {
    asNavFor: '#about-media-carousel',
    dots: false,
    nextArrow: false,
  });
})

hotReload();

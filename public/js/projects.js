import '../css/projects.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import {
  scrollTo,
  hotReload,
  sliceArray,
  mobileNavHandler,
  slickHelper,
  timelineHelper
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
      .add([
        tweenText('#textB1 .project-title .body-text'),
        tweenText('#textB1 .project-location .body-text'),
        tweenText('#textB1 .project-type .body-text'),
      ], 'labelB')
      .add([
        TweenMax.fromTo('#textB1 .project-location img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
        TweenMax.fromTo('#textB1 .project-type img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
      ], 'labelB+=.4')
      .add(tweenMedia(
        '#mediaB2 .media-overlay',
        '#mediaB2 .media'), 'labelB+=.4')
      .add(tweenText('#textB3'), 'labelB+=.8')
      .add(tweenAnchor(
        '#anchorB4 .monty-link-text',
        '#anchorB4 .monty-link-chevron',
        '#anchorB4 .monty-link-underline'), 'labelB+=.8', 'sequence')

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
      timeline
      .add([
        tweenText('#textC1 .project-title .body-text'),
        tweenText('#textC1 .project-location .body-text'),
        tweenText('#textC1 .project-type .body-text'),
      ], 'labelC')
      .add([
        TweenMax.fromTo('#textC1 .project-location img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
        TweenMax.fromTo('#textC1 .project-type img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
      ], 'labelC+=.4')
      .add(tweenMedia(
        '#mediaC2 .media-overlay',
        '#mediaC2 .media'), 'labelC+=.4')
      .add(tweenText('#textC3'), 'labelC+=.8')
      .add(tweenAnchor(
        '#anchorC4 .monty-link-text',
        '#anchorC4 .monty-link-chevron',
        '#anchorC4 .monty-link-underline'), 'labelC+=.8', 'sequence')

    return timeline;
  },

  timelineD: function() {
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
      timeline
      .add([
        tweenText('#textD1 .project-title .body-text'),
        tweenText('#textD1 .project-location .body-text'),
        tweenText('#textD1 .project-type .body-text'),
      ], 'labelD')
      .add([
        TweenMax.fromTo('#textD1 .project-location img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
        TweenMax.fromTo('#textD1 .project-type img', .5, { autoAlpha: 0 }, { autoAlpha: 1 }),
      ], 'labelD+=.4')
      .add(tweenMedia(
        '#mediaD2 .media-overlay',
        '#mediaD2 .media'), 'labelD+=.4')
      .add(tweenText('#textD3'), 'labelD+=.8')
      .add(tweenAnchor(
        '#anchorD4 .monty-link-text',
        '#anchorD4 .monty-link-chevron',
        '#anchorD4 .monty-link-underline'), 'labelD+=.8', 'sequence')

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
const carouselInitWrappers = sliceArray(document.querySelectorAll('.carousel-init-wrapper'))
const modalControl = sliceArray(document.querySelectorAll('.modal-control'))

modalControl.forEach(node => {
  node.addEventListener('click', e => {
    const message = node.getAttribute('data-message');
    const targetId = node.getAttribute('data-target');

    const target = document.querySelector(`#${targetId}`);

    target.classList.toggle('modal-active')
  })
})

window.addEventListener('load', function(e) {
  controller.addScene([
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.projects-section-one',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#project-wrapper-1',
      triggerHook: .8,
    }).setTween(timelineMaster.timelineB()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#project-wrapper-2',
      triggerHook: .8,
    }).setTween(timelineMaster.timelineC()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '#project-wrapper-3',
      triggerHook: .8,
    }).setTween(timelineMaster.timelineD()),
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: '.cta-section .content-wrapper',
      triggerHook: .7,
    }).setTween(timelineMaster.timelineCTA()),

    new ScrollMagic.Scene({
      triggerElement: '#project-wrapper-3',
      reverse: true,
    }).setClassToggle('.main-navigation', 'sticky')
  ])

  carouselInitWrappers.forEach(node => {
    const nodeId = node.getAttribute('id');
    slickHelper(`#${nodeId}`);
  })
})

hotReload();

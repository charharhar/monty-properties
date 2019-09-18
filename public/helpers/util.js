
/**
 * Utility Functions
 */

export function hotReload() {
  return (process.env.NODE_ENV === 'development') && module.hot && module.hot.accept();
}

export function removeAllChildren(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}

export function findParent(node, className) {
  let tempNode = node;

  while (!tempNode.classList.contains(className)) {
    tempNode = tempNode.parentNode;
  }

  return tempNode
}

export function sliceArray(nodeArray) {
  return Array.prototype.slice.call(nodeArray)
}

export function mobileNavHandler(toggle, mobileNav) {
  const body = document.querySelector('body');

  toggle.addEventListener('click', function(e) {
    e.preventDefault();

    if (this.classList.contains('mobile-active') === true) {
      this.classList.remove('mobile-active')
      mobileNav.classList.remove('mobile-active')
      body.classList.remove('mobile-active')

      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    } else {
      const scrollY = window.scrollY;
      body.style.top = `-${scrollY}px`;

      this.classList.add('mobile-active');
      mobileNav.classList.add('mobile-active');
      body.classList.add('mobile-active')
    }

  });
}

export function scrollTop() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

export function scrollTo(e, elem) {
  e.preventDefault();

  $('html, body').animate({
    scrollTop: $(elem).offset().top
  }, 1000);
}

export function slickHelper(target, options = {}) {
  const slickOptions = Object.assign({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '0',
    arrows: true,
    fade: false,
    prevArrow: null,
    nextArrow: '<span class="monty-link-chevron nextSlide" id="nextSlide" data-message="next"><span class="chevron-wrapper"><span class="chevron"></span></span></span>',
    dots: true,
  }, options)

  const slider = $(target).slick(slickOptions)

  return slider;
}

export const timelineHelper = {
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
}

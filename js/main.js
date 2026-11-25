/* ===================================================================
 * Mueller 1.0.0 - Main JS (trimmed for Aditya Itnal's portfolio)
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function() {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            const loc = window.scrollY;

            hdr.classList.toggle('sticky', loc > triggerHeight);
            hdr.classList.toggle('offset', loc > triggerHeight + 20);
            hdr.classList.toggle('scrolling', loc > triggerHeight + 150);

        });

    }; // end ssMoveHeader


   /* mobile menu
    * ---------------------------------------------------- */
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener('click', function() {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                siteBody.classList.remove('menu-is-open');
                toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


   /* highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');
        if (!sections.length) return;

        window.addEventListener('scroll', navHighlight);

        function navHighlight() {

            const scrollY = window.scrollY;

            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
                const link = document.querySelector('.s-header__nav a[href="#' + sectionId + '"]');

                // skip sections without a matching nav link
                if (!link) return;

                const isActive = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
                link.parentNode.classList.toggle('current', isActive);
            });
        }

    }; // end ssScrollSpy


   /* masonry
    * ------------------------------------------------------ */
    const ssMasonry = function() {

        const containerBricks = document.querySelector('.bricks-wrapper');
        if (!containerBricks) return;

        imagesLoaded(containerBricks, function() {

            new Masonry(containerBricks, {
                itemSelector: '.entry',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                resize: true
            });

        });

    }; // end ssMasonry


   /* portfolio lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.brick .entry__link');

        folioLinks.forEach(function(link) {
            const modalbox = link.getAttribute('href');
            if (!modalbox || !modalbox.startsWith('#')) return;

            const modalEl = document.querySelector(modalbox);
            if (!modalEl) return;

            let instance;

            // close on Escape (listener only exists while the modal is open)
            const onKeydown = function(event) {
                if (event.key === 'Escape') instance.close();
            };

            instance = basicLightbox.create(modalEl, {
                onShow: function(inst) {
                    document.addEventListener('keydown', onKeydown);
                    const video = inst.element().querySelector('video');
                    if (video) video.play().catch(function() {});
                },
                onClose: function(inst) {
                    document.removeEventListener('keydown', onKeydown);
                    const video = inst.element().querySelector('video');
                    if (video) video.pause();
                }
            });

            link.addEventListener('click', function(event) {
                event.preventDefault();
                instance.show();
            });
        });

    }; // end ssLightbox


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector('.ss-go-top');

        if (!goTopButton) return;

        const update = function() {
            goTopButton.classList.toggle('link-is-visible', window.scrollY >= pxShow);
        };

        update();
        window.addEventListener('scroll', update);

    }; // end ssBackToTop


   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        };

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssMasonry();
        ssLightbox();
        ssBackToTop();
        ssMoveTo();

    })();

})(document.documentElement);

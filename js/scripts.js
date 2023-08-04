window.onload = function () {

  // Stiky menu.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 130) {
        header.addClass('sticky');
      } else if ($(window).scrollTop() <= headerTop) {
        header.removeClass('sticky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Scroll to ID
	function menuScroll(menuItem) {
		menuItem.find('a[href^="#"]').click( function(){
			var scroll_el = $(this).attr('href'),
					time = 500;
			if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, time);
				$(this).addClass('active');
			}
			return false;
		});
	};
	menuScroll($('.js-scroll-to'));

  // Parralax mouse
	function parallaxMove(parallax) {
		if (parallax.length) {
			parallax.each(function () {
				var $window = $(window),
					$this = $(this),
					direction = $this.data('direction'),
					intensity = $this.data('intensity'),
					speed = $this.data('speed'),
					revers = $this.data('revers');
				if (!direction) {
					direction = 'xy';
				}
				if (!intensity) {
					intensity = 3;
				}
				if (!speed) {
					speed = 100;
				}
				if (!revers) {
					revers = false;
				}
				$this.css({ transition: (speed / 1000) + 's' });
				$window.mousemove(function (event) {
					var left = event.clientX,
						top = event.clientY,
						windowWidth = $window.width(),
						windowHeight = $window.height();
					if (revers) {
						moveX = ((left - windowWidth / 2) * intensity / 100 * -1).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100 * -1).toFixed();
					} else {
						moveX = ((left - windowWidth / 2) * intensity / 100).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100).toFixed();
					}
					inVisible($this);
					function inVisible(element) {
						var topScroll = $(document).scrollTop(),
							screenHeight = $(window).height(),
							bottomScroll = topScroll + screenHeight,
							elementHeight = element.height(),
							elementTop = element.offset().top,
							elementBottom = elementTop + elementHeight;
						if (elementTop < bottomScroll && elementBottom > topScroll) {
							if (direction == 'xy') {
								$this.css({ transform: 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)' });
							}
							else if (direction == 'x') {
								$this.css({ transform: 'translateX(' + moveX + 'px)' });
							}
							else if (direction == 'y') {
								$this.css({ transform: 'translateY(' + moveY + 'px)' });
							}
						}
					};
				});
			});
		}
	};
	parallaxMove($('.js-parallaxMouse'));

  // Swiper
  if ($('#sliderWelcolme').length) {
    const sliderWelcolme = new Swiper('#sliderWelcolme', {
      slidesPerView: 1,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        prevEl: '.welcome-slider__arrow--prev',
        nextEl: '.welcome-slider__arrow--next',
      },
    });
  }

  // Swiper
  if ($('#sliderProduct').length) {
    const sliderProduct = new Swiper('#sliderProduct', {
      slidesPerView: 1.2,
      spaceBetween: 10,
      loopedSlides: 4,
      threshold: 3,
      loop: true,
      centeredSlides: true,
      breakpoints: {
        1050: {
          slidesPerView: 3,
          spaceBetween: 15,
          centeredSlides: false,
        },
      }
    });
  }

  // Swiper
  if ($('#sliderInstagram').length) {
    const sliderInstagram = new Swiper('#sliderInstagram', {
      slidesPerView: 1.2,
      spaceBetween: 10,
      loopedSlides: 5,
      threshold: 3,
      loop: true,
      centeredSlides: true,
      breakpoints: {
        1050: {
          slidesPerView: 4,
          spaceBetween: 20,
          centeredSlides: false,
        },
      }
    });
  }

  if ($('#slideReview').length) {
    var sliderReviewThumb = new Swiper("#sliderReviewThumb", {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 10,
      watchSlidesProgress: true,
      // simulateTouch: false,
      // allowTouchMove: false,
      breakpoints: {
        769: {
          slidesPerView: 5,
        },
      },
      on: {
        slideChange: (s) => {
          console.log(s.activeIndex);
          slideReview.slideTo(s.activeIndex, 300)
        }
      }
    });
    var slideReview = new Swiper("#slideReview", {
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      navigation: {
        nextEl: ".review__button--next",
        prevEl: ".review__button--prev",
      },
      thumbs: {
        swiper: sliderReviewThumb,
      },
      on: {
        slideChange: (s) => {
          console.log(s.activeIndex);
          sliderReviewThumb.slideTo(s.activeIndex, 300)
        }
      }
    });
  }

  // Line animation
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  gsap.set(".pathBall", { xPercent: -50, yPercent: -50 });

  var action = gsap.timeline({
    defaults: { duration: 1, ease: 'none' },
    scrollTrigger: {
      trigger: "#path",
      scrub: 0,
      start: "top center",
      end: "bottom center",
    }
  })
    .from(".pathBall", { motionPath: { path: ".pathLine", align: ".pathLine", offsetX: 0, offsetY: 0, } }, 0)

  // Map
  let map;

  async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: 33.984577345655985, lng: -118.46422749999999 },
      zoom: 15,
    });
  }

  initMap();

}
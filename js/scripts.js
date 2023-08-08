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

  if ($('.js-parallaxMouse').length) {
    var rellax = new Rellax('.js-parallaxMouse', {
      speed: -2,
      center: true
    });
  }

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
      navigation: {
        nextEl: ".products-slider__button--next",
        prevEl: ".products-slider__button--prev",
      },
      breakpoints: {
        769: {
          slidesPerView: 3,
          spaceBetween: 15,
          centeredSlides: false,
        },
      },
      // on: {
      //   progress: function (swiper, progress) {
      //     console.log(progress);
      //   }
      // }
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
        769: {
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

  // gsap.set('.pathBall', { xPercent: -50, yPercent: 20 });

  var action = gsap
    .timeline({
      defaults: { duration: 1, ease: 'none' },
      scrollTrigger: {
        trigger: '.story',
        scrub: 0.1,
        start: '20% center',
        end: 'bottom +=100%',
        // markers: true,
      },
    })
    .fromTo('.pathBall', { xPercent: -37, yPercent: -117 }, { xPercent: -50, yPercent: -100 }, 0)
    .from('.pathBall', { motionPath: { path: '.pathLine', align: '.pathLine' } }, 0);

  // Map
  let map;

  async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    const location = {
      0: { lat: 33.984577345655985, lng: -118.46422749999999 },
      1: { lat: 26.023503244307555, lng: -80.18493574609377 }
    };

    map = new Map(document.getElementById("map"), {
      center: { lat: 33.984577345655985, lng: -118.46422749999999 },
      zoom: 15,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "stylers": [
            {
              "color": "#d2e9fa"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "color": "#c6dcf0"
            }
          ]
        }
      ]
    });

    const beachMarker_1 = new google.maps.Marker({
      position: location[0],
      map,
      icon: {
        url: "img/mark-map.png",
        anchor: new google.maps.Point(150, 200),
        scaledSize: new google.maps.Size(290, 308)
      }
    });

    const beachMarker_2 = new google.maps.Marker({
      position: location[1],
      map,
      icon: {
        url: "img/mark-map.png",
        anchor: new google.maps.Point(150, 200),
        scaledSize: new google.maps.Size(290, 308)
      }
    });

    // map.setCenter(location);

    $('.contact__btn').on('click', function (e) {
      e.preventDefault();
      index = $(this).index();
      map.setCenter(location[index]);
      map.setZoom(15);
      $('.contact__btn').removeClass('active');
      $(this).addClass('active');
      $('.contact__block').removeClass('open');
      $('.contact__block[data-num="' + index + '"]').addClass('open');
    })

  }

  initMap();

}
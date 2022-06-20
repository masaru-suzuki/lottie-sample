import Swiper, { Pagination, Autoplay, A11y, Parallax, FreeMode } from 'swiper';
import { tabController } from 'modules/tabController';

const keyvisualBgSlider = () => {
  const sliderWrapElm = '.p-keyVisual_bgSlider';
  if (document.querySelector(sliderWrapElm) == null) {
    return;
  }

  return new Swiper(sliderWrapElm, {
    modules: [Autoplay, Pagination, A11y, Parallax],
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 4000,
    },
    parallax: true,
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
};

const keyvisualTextSlider = () => {
  const sliderWrapElm = '.p-keyVisual_textSlider';
  if (document.querySelector(sliderWrapElm) == null) {
    return;
  }

  return new Swiper(sliderWrapElm, {
    modules: [Autoplay, Pagination, A11y, Parallax],
    speed: 0,
    loop: true,
    allowTouchMove: false,
    autoHeight: true,
  });
};

const keyvisualSlider = () => {
  const bgSlider = keyvisualBgSlider();
  const textSlider = keyvisualTextSlider();

  if (bgSlider == null || textSlider == null) {
    return;
  }

  bgSlider.on('slideChange', function () {
    textSlider.slideNext();
  });
};

const dandaSlider = () => {
  const sliderWrapElm = '.p-homeDASlider';
  if (document.querySelector(sliderWrapElm) == null) {
    return;
  }

  new Swiper(sliderWrapElm, {
    modules: [Autoplay, A11y, FreeMode],
    loop: true,
    slidesPerView: 1.5,
    speed: 8000,
    freeMode: {
      enabled: true,
      sticky: true,
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
    960: {
      slidesPerView: 3,
    }
  }
  });
};

export const Home = () => {
  keyvisualSlider();
  dandaSlider();
  tabController();
};
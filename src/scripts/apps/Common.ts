import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';
import StickySidebar from 'sticky-sidebar';
import SmoothScroll from 'smooth-scroll';
import MicroModal from 'micromodal';
import { DDMM } from 'modules/ddmm';
import { setSideLocalNav } from '../modules/setSideLocalNav';

const callDDMM = () => {
  const ddmm = new DDMM();
};

const fallbackScrollBehavior = () => {
  const isSmoothScrollSupported =
    'scrollBehavior' in document.documentElement.style;

  //scrollBehaviorをサポートしないブラウザでのみ発火
  if (!isSmoothScrollSupported) {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 500,
      durationMax: 1000,
      easing: 'easeInOutQuad',
      header: '.header',
    });
  }
};

/**
 * Reference:
 * [Document: scroll event - スクロールイベントを抑制する](https://developer.mozilla.org/ja/docs/Web/API/Document/scroll_event#scroll_event_throttling)
 * [頻度が高いイベントへの対応](https://listener.noplan.cc/coding/)
 * [Canvasだけじゃない！
requestAnimationFrameを使った
アニメーション表現](https://ics.media/entry/210414/)
 */

const fixedHeaderController = () => {
  const header = <HTMLElement>document.querySelector('.header');
  if (header == null) {
    return;
  }

  const subNav = <HTMLElement>header.querySelector(' .ddmm-sub');
  const windowHeight = window.innerHeight;
  const fixedClassName = '-tight';

  const handleScroll = (scroll_pos: number) => {
    if (scroll_pos > windowHeight / 2) {
      if (!header.classList.contains(fixedClassName)) {
        header.classList.add(fixedClassName);
        subNav.hidden = true;
      }
    } else {
      if (header.classList.contains(fixedClassName)) {
        header.classList.remove(fixedClassName);
        subNav.hidden = false;
      }
    }
  };

  let last_known_scroll_position = 0;
  let ticking = false;

  window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
};

const setModal = () => {
  MicroModal.init({
    openTrigger: 'data-micromodal-open',
    closeTrigger: 'data-micromodal-close',
  });
};

export const Common = () => {
  picturefill();
  objectFitImages();
  setSideLocalNav();
  callDDMM();
  fallbackScrollBehavior();
  fixedHeaderController();
  setModal();
};

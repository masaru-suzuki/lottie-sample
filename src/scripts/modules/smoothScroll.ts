import SmoothScroll from 'smooth-scroll';
import { UseMediaQuery } from '../modules/useMediaQuery';

/**
 * scroll-marginを調整する関数
 * header: 該当の要素分scroll-marginをつける
 * speedSaDuration: trueなら、scroll距離に関わらず同じ秒数で移動する
 * offset: scroll-marginを設定した要素にさらに余白をつける場合に用いる
 * data属性に渡して使う
 * sample
 * scroll先
 * section.p-recruit-section#section03(data-scroll-margin-sp="16" data-scroll-margin-pc="0")
 * リンク要素
 * a(href="#-section01" data-scroll) section01
 */
export const smoothScroll = () => {
  new UseMediaQuery({
    mediaQueryString: '(min-width: 768px)',
    sp: () => {
      const option = {
        header: '#js-header',
        speed: 800,
        speedAsDuration: true,
        offset: (toggle) => toggle.dataset.scrollMarginSp || 0,
      };

      new SmoothScroll('a[href*="#"]', option);
    },
    tablet: () => {
      const option = {
        header: '#js-pcHeader',
        speed: 500,
        speedAsDuration: true,
        offset: (toggle) => toggle.dataset.scrollMarginPc || 0,
      };

      new SmoothScroll('a[href*="#"]', option);
    },
  });
};

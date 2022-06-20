import { CurrentHighlightNavigation } from 'modules/currentHighlightNavigation';
import { UseMediaQuery } from 'modules/useMediaQuery';
import StickySidebar from 'sticky-sidebar';

export const setSideLocalNav = () => {
  if (document.getElementById('columns') == null) {
    return;
  }

  const header = document.querySelector('.header');

  const stickySidebar = new StickySidebar('.l-columns_sidebar', {
    topSpacing: header?.clientHeight,
    bottomSpacing: 20,
    containerSelector: '.l-columns',
    innerWrapperSelector: '.l-columns_sidebarInner',
  });

  const currentHighlightNavigation = new CurrentHighlightNavigation({
    sections: document.querySelectorAll('[data-observer]'),
    navItems: document.querySelectorAll('.c-sideLocalNavigation_item'),
  });

  const thisMediaQuery = new UseMediaQuery({
    sp: () => {
      stickySidebar.destroy();
    },
    tablet: () => {
      stickySidebar.initialize();
      // TOPまで戻らないとstickySlideしないため、updateStickyを追加
      stickySidebar.updateSticky();
    },
  });
};

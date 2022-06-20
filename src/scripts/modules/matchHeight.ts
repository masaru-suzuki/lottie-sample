import { UseMediaQuery } from './useMediaQuery';

const handleMatchHeight = (items: HTMLElement[]) => {
  items.forEach((item) => {
    item.removeAttribute('style');
  });

  const heightArray = items.map((item) => item.clientHeight);
  const maxHeight = Math.max(...heightArray);

  items.forEach((item) => {
    item.style.height = maxHeight + 'px';
  });
};

export const matchHeight = (options = { onlyTablet: false }) => {
  const items: NodeListOf<HTMLElement> =
    document.querySelectorAll('[data-matchheight]');
  if (items.length < 1) {
    return;
  }

  const { onlyTablet } = options;

  const orgItems = Array.from(items);
  let groups = orgItems.map((item) => item.dataset.matchheight);
  groups = Array.from(new Set(groups));
  groups = groups.filter(Boolean);

  const updateHeight = () => {
    groups.forEach((group) => {
      if (typeof group === 'undefined') {
        return;
      }

      const groupItems = orgItems.filter(
        (item) => item.dataset.matchheight === group
      );

      handleMatchHeight(groupItems);
    });
  };

  const removeHeight = () => {
    orgItems.forEach((item) => {
      item.removeAttribute('style');
    });
  };

  updateHeight();

  const thisMediaQuery = new UseMediaQuery({
    sp: () => {
      if (onlyTablet) {
        removeHeight();
      }
    },
    tablet: () => {
      updateHeight();
    },
  });
};

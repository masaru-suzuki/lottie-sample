import { ScrollObserver } from './scrollObserver';

export class CurrentHighlightNavigation {
  private sections: HTMLElement[];
  private navItems: HTMLElement[];
  private observer: any;

  constructor(options: {
    sections: NodeListOf<HTMLElement>;
    navItems: NodeListOf<HTMLElement>;
  }) {
    const { sections, navItems } = options;
    this.sections = Array.from(sections);
    this.navItems = Array.from(navItems);

    this.init();
  }

  private init() {
    this.observer = new ScrollObserver(
      this.sections,
      this.highlightMenuItem.bind(this),
      { rootMargin: '-50% 0px' }
    );
  }

  private highlightMenuItem(section, intersecting) {
    this.navItems.forEach((item) => {
      const itemHref = item.children[0].getAttribute('href');
      const activeSection = section.getAttribute('id');
      const activeClass = '-isActive';
      if (intersecting) {
        if (activeSection === itemHref?.slice(1)) {
          item.classList.add(activeClass);
        } else {
          item.classList.remove(activeClass);
        }
      }
    });
  }
}

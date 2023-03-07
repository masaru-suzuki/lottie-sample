/**
How to use:

const thisMediaQuery = new UseMediaQuery({
  mediaQueryString: '(min-width: 600px)',
  sp: () => {
    console.log('sp');
  },
  tablet: () => {
    console.log('pc');
  },
});

*/

export class UseMediaQuery {
  private tabletFunction?: () => void;
  private spFunction?: () => void;
  private mediaQueryString = '(min-width: 960px)';
  private mediaQuery = window.matchMedia(this.mediaQueryString);
  private ticking = false;

  constructor(options: { tablet?: () => void; sp?: () => void; mediaQueryString?: string }) {
    const { tablet, sp, mediaQueryString } = options;

    this.tabletFunction = tablet;
    this.spFunction = sp;
    this.mediaQueryString = mediaQueryString || this.mediaQueryString;
    this.mediaQuery = window.matchMedia(this.mediaQueryString);

    this.init();
  }

  private init() {
    this.mediaQuery.addEventListener('change', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleChange(e);
          this.ticking = false;
        });

        this.ticking = true;
      }
    });

    this.handleChange(this.mediaQuery);
  }

  private handleChange(e: { matches: any }) {
    if (e.matches) {
      if (this.tabletFunction == null) {
        return;
      }

      this.tabletFunction();
    } else {
      if (this.spFunction == null) {
        return;
      }

      this.spFunction();
    }
  }
}

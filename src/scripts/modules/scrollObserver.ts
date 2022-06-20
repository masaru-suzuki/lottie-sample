export class ScrollObserver {
  private io: any;
  private options = {};
  private once = false;

  constructor(
    private elements: HTMLElement[],
    private callback: Function,
    options
  ) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      once: false,
    };

    this.options = { ...defaultOptions, ...options };
    this.once = options.once;

    this.init();
  }

  private init() {
    // console.log(this.elements);
    const initCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.callback(entry.target, true);

          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.callback(entry.target, false);
        }
      });
    };

    this.io = new IntersectionObserver((entries, observer) => {
      initCallback(entries, observer);
    }, this.options);

    if (typeof this.io !== 'undefined') {
      this.elements.forEach((el) => this.io.observe(el));
    }
  }
}

/**
 * Intersection Observerを使いまわせるようにした
 * @module
 * @param {elements}  - 監視対象（querySelectorAllで指定したHTMLElement
 * @param {intersectingCallback}  - 監視時の実行関数
 * @param {unIntersectingCallback}  - 監視解除時の実行関数
 * @param {options}  - intersection observerの個別オプション
 * @return {} - []という形式で戻る。
 */

// 無名関数の型定義
declare type NoNameFUnctionReturnVoid = (string, boolean) => void;

export class ScrollObserver {
  private io: any;
  private options = {};
  private once = false;

  constructor(private elements: HTMLElement[], private intersectingCallback: NoNameFUnctionReturnVoid, private unIntersectingCallback: NoNameFUnctionReturnVoid, options) {
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
    const initCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.intersectingCallback(entry.target, true);

          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.unIntersectingCallback(entry.target, false);
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

import { UseMediaQuery } from './useMediaQuery';
/**
 * Drop Drawer Mega Menu
 */

const allClose = (headers: NodeListOf<HTMLElement>, panels: NodeListOf<HTMLElement>) => {
  Array.from(headers).forEach((header) => {
    header.setAttribute('aria-expanded', 'false');
  });
  Array.from(panels).forEach((panel) => {
    panel.hidden = true;
  });
};

const expandedAction = (navHeaders: NodeListOf<HTMLButtonElement> | null = null, navPanels: NodeListOf<HTMLElement> | null = null) => {
  //同じaria-controlsをもつ要素をリストする
  const getHeaders = (header: HTMLButtonElement) => {
    const ariaControls = header.getAttribute('aria-controls');
    const headers: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`[aria-controls*='${ariaControls}']`);
    return headers;
  };

  const open = (header: HTMLButtonElement, panel: HTMLElement) => {
    if (navHeaders && navPanels) {
      allClose(navHeaders, navPanels);
    }

    const headers = getHeaders(header);
    Array.from(headers).forEach((header) => {
      header.setAttribute('aria-expanded', 'true');
    });
    panel.hidden = false;
  };

  const close = (header: HTMLButtonElement, panel: HTMLElement) => {
    const headers = getHeaders(header);
    Array.from(headers).forEach((header) => {
      header.setAttribute('aria-expanded', 'false');
    });
    panel.hidden = true;
  };

  return { open, close };
};

const toggleExpanded = (event: { currentTarget: any }, navHeaders: NodeListOf<HTMLButtonElement> | null = null, navPanels: NodeListOf<HTMLElement> | null = null) => {
  const header = event.currentTarget;
  const panelId = <string>header.getAttribute('aria-controls');
  const panel = <HTMLElement>document.getElementById(panelId);

  if (header.getAttribute('aria-expanded') === 'false') {
    expandedAction(navHeaders, navPanels).open(header, panel);
  } else {
    expandedAction(navHeaders, navPanels).close(header, panel);
  }
};

export class DDMM {
  private trigger = <HTMLButtonElement>document.getElementById('ddmm-trigger');
  private headers: NodeListOf<HTMLButtonElement> = document.querySelectorAll("[aria-controls*='ddmm-panel-']");
  private panels: NodeListOf<HTMLElement> = document.querySelectorAll("[aria-labelledby*='ddmm-header-']");
  private backButton = {
    labelText: 'メインメニュー',
  };

  constructor() {
    this.init();
  }

  private init() {
    this.addBackButton();
    this.setTriggers();
  }

  private setTriggers() {
    //グロナビの開閉トリガー（SPのみ）
    this.trigger?.addEventListener('click', toggleExpanded);

    //各パネルをもつナビゲーションのトリガー
    if (this.headers != null) {
      Array.from(this.headers).forEach((header) => {
        const thisMediaQuery = new UseMediaQuery({
          sp: () => {
            header.addEventListener('click', (event) => {
              event.preventDefault();
              toggleExpanded(event, this.headers, this.panels);
            });
          },
          tablet: () => {
            const navItem = header.parentElement;
            const panelId = <string>header.getAttribute('aria-controls');
            const panel = <HTMLElement>document.getElementById(panelId);

            let ddmmFlag = false;
            let panelFlag = false;

            panel.addEventListener('mouseenter', () => {
              panelFlag = true;
            });

            panel.addEventListener('mouseleave', () => {
              panelFlag = false;

              if (ddmmFlag) {
                expandedAction(this.headers, this.panels).open(header, panel);
              }
            });

            navItem?.addEventListener('mouseenter', () => {
              ddmmFlag = true;

              if (!panelFlag) {
                header.addEventListener('mouseenter', (event) => {
                  expandedAction(this.headers, this.panels).open(header, panel);
                  panelFlag = true;
                });
              }
            });

            navItem?.addEventListener('mouseleave', () => {
              panelFlag = false;
              ddmmFlag = false;

              if (!panelFlag) {
                expandedAction(this.headers, this.panels).close(header, panel);
              }
            });
          },
        });
      });
    }
  }

  private addBackButton() {
    if (this.panels == null) {
      return;
    }

    const createButton = () => {
      const d = document;
      const button = d.createElement('button');

      button.type = 'button';
      button.classList.add('ddmm-back');
      button.innerHTML = `<span class="c-icon-arrow"></span><span>${this.backButton.labelText}</span>`;
      // button.innerText = this.backButton.labelText;

      return button;
    };

    Array.from(this.panels).forEach((panel) => {
      const button = createButton();

      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-controls', panel.id);
      button.addEventListener('click', toggleExpanded);

      panel.insertBefore(button, panel.firstChild);
    });
  }
}

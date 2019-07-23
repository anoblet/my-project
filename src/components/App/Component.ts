import { LitElement, customElement, property } from "lit-element";

import BeforeRenderMixin from "../../mixins/BeforeRender";
import Debug from "../../Debug";
import GlobalStyle from "../../GlobalStyle";
import Media from "../../Media";
import Router from "../../Router";
import State from "../../State";
import Store from "../../Store";
import Style from "./Style";
import Template from "./Template";
import Theme from "../../Theme";
import { beforeRender } from "./BeforeRender";
import { config } from "../../../config";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { routes } from "./Routes";
import { toast } from "../Toast/Toast";

@customElement("app-component")
export class App extends BeforeRenderMixin(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened: boolean = false;
  @property() public mediaSize: string;

  // Lifecycle
  constructor() {
    super();
    Debug.log("Constructor");

    State.addReducer({ type: "app", Store });
    State.addReducer({ type: "user", Store });
    State.addReducer({ type: "settings", Store });

    if (config.theme) {
      Theme.set(Theme.convert(config.theme), document.body);
      State.set({
        type: "app",
        data: { settings: { theme: config.theme } },
        Store
      });
    }

    this.initMediaSize();
  }

  public connectedCallback() {
    super.connectedCallback();
    // Register drawer listeners
    this.registerlisteners();
  }

  public beforeRender = beforeRender.bind(this);

  public firstUpdated() {
    Debug.log("First updated");
    Store.subscribe(() => this.requestUpdate());
    this.registerRouter();
    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });
    const drawerComponent: LitElement = this.shadowRoot.querySelector(
      "drawer-component"
    );
    drawerComponent.updateComplete.then(() => {
      console.log("hi");
      observeScroll(
        drawerComponent.shadowRoot.querySelector("main"),
        (direction: string) => {
          console.log("direction", direction);
        }
      );
    });
    drawerComponent.updateComplete.then(() => {
      const main = drawerComponent.shadowRoot.querySelector("main");
      observeScroll(main, () => {});
      return;
      let prevWidth = main.clientWidth;
      let prevPosition = main.scrollTop;
      let ticking = false;
      main.onscroll = () => {
        const width = main.clientWidth;
        if (width !== prevWidth) {
          prevWidth = width;
          return;
        }
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentPosition = main.scrollTop;
            const footer: LitElement = this.shadowRoot.querySelector("#footer");
            if (prevPosition >= currentPosition) {
              footer.removeAttribute("hidden");
            } else {
              footer.setAttribute("hidden", "");
            }
            prevPosition = currentPosition;
            ticking = false;
          });
          ticking = true;
        }
      };
    });
  }

  /**
   * Set an observer for the client media size
   */
  public initMediaSize() {
    Media.subscribe((mediaSize: string) => {
      this.mediaSize = mediaSize;
    });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    Router.install((location: any) => {
      Router.routeChanged({
        location,
        routes,
        portal: this.shadowRoot.querySelector("#portal")
      });
      // Reset scroll position
      const scrollTarget = this.shadowRoot.querySelector("#portal");
      scrollTarget.scrollTo(0, 0);
      // Update Store
      State.set({
        type: "app",
        data: { activeRoute: location.pathname },
        Store
      });
    });
  }

  // Handlers
  public _openDrawer() {
    this.drawerOpened = true;
  }

  public _closeDrawer() {
    this.drawerOpened = false;
  }

  public _toggleDrawer() {
    const drawer: any = this.renderRoot.querySelector("drawer-component");
    if (drawer) drawer.toggle();
  }

  public _toggleProfile() {
    const menu: any = this.renderRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  public closeMenus() {
    this.drawerOpened = false;
    const menu: any = this.renderRoot.querySelector("#profile-menu");
    menu.close();
  }
}

const observeScroll = ({ target, callback }) => {
  let prevWidth = target.clientWidth;
  let prevTop = target.scrollTop;

  // Handler
  target.onscroll = async () => {
    // Let's debounce here
    let ticking = false;
    if (!ticking) {
      window.requestAnimationFrame(() => {});
    }
  };

  const result = "Up";
  // Return callback or a promise
  return callback ? callback(result) : result;
};

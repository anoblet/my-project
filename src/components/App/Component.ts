import {
  LitElement,
  css,
  customElement,
  property,
  query,
  unsafeCSS
} from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import { DrawerComponent } from "@anoblet/drawer-component";
import GlobalStyle from "../../GlobalStyle";
import { Location } from "../../models/location";
import Media from "../../Media";
import { MobxReactionUpdate } from "@adobe/lit-mobx";
import Performance from "../../Performance";
import Router from "@anoblet/router";
import State from "../../State";
import Store from "../../Store";
import Template from "./Template";
import Theme from "../../Theme";
import { beforeRender } from "./BeforeRender";
import { config } from "../../../etc/config";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { routes } from "./Routes";
import { toast } from "../Toast/Toast";

// Let's assume CSS modules are a thing in the future
const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

@customElement("app-component")
export class AppComponent extends BeforeRender(MobxReactionUpdate(LitElement)) {
  public static styles = [GlobalStyle, style];
  public render = Template.bind(this);

  // @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  // public drawerOpened: boolean = false;
  @property({ type: String, reflect: true }) public mediaSize: string;
  @property({ type: String, reflect: true }) public activeRoute: string;

  @query("drawer-component") drawer: DrawerComponent;
  @query("#portal") portal: HTMLElement;

  // Reactive model for location
  private location = new Location();

  // Lifecycle
  constructor() {
    super();
    Performance.log("Constructor");

    State.addReducer({ type: "app", Store });
    State.addReducer({ type: "user", Store });
    State.addReducer({ type: "settings", Store });

    // Get static theme
    if (config.theme) {
      Theme.set(Theme.convert(config.theme), document.body);
      State.set({
        type: "app",
        data: { settings: { theme: config.theme } },
        Store
      });
    }

    this.initMediaSize();
    Store.subscribe(() => {
      this.syncActiveRoute();
    });
    this.syncActiveRoute();
  }

  public connectedCallback() {
    super.connectedCallback();
    // Register drawer listeners
    this.registerlisteners();
  }

  public beforeRender = beforeRender.bind(this);

  public firstUpdated() {
    Performance.log("First updated");

    this.registerRouter();

    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });

    this.registerScrollListeners();

    // Set user profile image
    const state = Store.getState();
    const user = state.user;
    const button: any = this.shadowRoot.querySelector("#userProfile");
    if (button) {
      button.style.background = `url('${user.photo}')`;
      button.style.backgroundSize = "contain";
    }
  }

  public syncActiveRoute() {
    const state = Store.getState();
    this.activeRoute = state.app.activeRoute;
  }

  public registerScrollListeners() {
    const drawerComponent: LitElement = this.shadowRoot.querySelector(
      "drawer-component"
    );
    drawerComponent.updateComplete.then(() => {
      const main = drawerComponent.shadowRoot.querySelector("main");
      const header: LitElement = this.shadowRoot.querySelector(
        "header-component"
      );
      const footer: LitElement = this.shadowRoot.querySelector("#footer");

      observeScroll({
        target: main,
        callback: (direction: string) => {
          if (direction === "up") {
            // header.removeAttribute("hidden");
            footer.removeAttribute("hidden");
          }
          if (direction === "down") {
            // header.setAttribute("hidden", "");
            footer.setAttribute("hidden", "");
          }
        }
      });
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
    // this.addEventListener("close-drawer", this._closeDrawer);
    // this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    Router.install((location: any) => {
      this.dispatchEvent(
        new CustomEvent("location-changed", {
          detail: {
            location
          }
        })
      );
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

      // MobX
      this.location.setPathname(location.pathname);

      // Close drawer on route change
      this.drawer.close();
    });
  }

  // Handlers
  // public _openDrawer() {
  //   this.drawerOpened = true;
  // }
  //
  // public _closeDrawer() {
  //   this.drawerOpened = false;
  // }

  public _toggleDrawer() {
    this.drawer.toggle();
  }

  public _toggleProfile() {
    const menu: any = this.renderRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  public closeMenus() {
    const menu: any = this.shadowRoot.querySelector("#profile-menu");
    menu.close();
  }
}

const observeScroll = ({ target, callback }) => {
  let prevWidth = target.clientWidth;
  let prevTop = target.scrollTop;
  let ticking = false;
  let result: string;

  // Handler
  target.onscroll = async () => {
    const width = target.clientWidth;
    if (width !== prevWidth) {
      prevWidth = width;
      return;
    }
    // Debounce
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentPosition = target.scrollTop;
        if (prevTop >= currentPosition) {
          result = "up";
        } else {
          result = "down";
        }
        callback(result);
        prevTop = currentPosition;
        ticking = false;
      });
      ticking = true;
    }
  };
};

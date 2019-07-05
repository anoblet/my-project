import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { config } from "../../../config";
import firebase from "../../Firebase";
import { debug, log } from "../../Debug";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { media } from "../../Media";
import { router } from "../../Router";
import { routes } from "./Routes";
import { state } from "../../State";
import { store } from "../../Store";
import { theme } from "../../Theme";
import { toast } from "../Toast/Toast";
import { user } from "../../User";
import { BeforeRender } from "../../mixins/BeforeRender";
import { addDefaultReducers, getAppSettings } from "./Utility";

@customElement("app-component")
export class App extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened: boolean = false;
  @property() public mediaSize: string;

  // Lifecycle
  constructor() {
    super();
    log("Constructor");
    addDefaultReducers();
    if (config.theme) {
      theme.set(theme.convert(config.theme), document.body);
      state.set({
        type: "app",
        data: { settings: { theme: config.theme } },
        store
      });
    }
    this.initMediaSize();
  }

  public connectedCallback() {
    super.connectedCallback();
    // Register drawer listeners
    this.registerlisteners();
  }

  public async beforeRender() {
    const _firebase = await firebase.init(config.firebase);
    _firebase.performance();
    if (config.globalSettings) {
      await getAppSettings((document: any) => {
        state.set({ data: { settings: document }, store, type: "app" });
        if (!config.staticTheme) {
          const _theme = theme.convert(document.defaultTheme);
          theme.set(_theme, this);
        }
      });
    }
    debug.log("Getting user level settings");
    const _user = await firebase.getUser();
    if (_user) {
      log("User logged in");
      const userData = user.extract(_user);
      state.set({ data: userData, store, type: "user" });
      log("Getting user settings");
      await user.getUserSettings((document: any) => {
        state.set({ data: { settings: document }, store, type: "user" });
      });
      log("Finished getting user settings");
      log("Getting user theme");
      await user.getUserTheme((document: any) => {
        theme.set(theme.convert(document), this);
        state.set({
          type: "app",
          data: { settings: { theme: document } },
          store
        });
      });
      log("Finished getting user theme");
    } else {
      log("User not logged in");
    }
    log("Finished getting user");
    document.querySelector("#loading").removeAttribute("enabled");
  }

  public firstUpdated() {
    log("First updated");
    store.subscribe(() => this.requestUpdate());
    this.registerRouter();
    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });
  }

  /**
   * Set an observer for the client media size
   */
  public initMediaSize() {
    this.drawerOpened = false;
    media.subscribe((mediaSize: string) => {
      // if (mediaSize === "mobile") this.drawerOpened = false;
      // if (mediaSize === "desktop") this.drawerOpened = true;
      this.mediaSize = mediaSize;
    });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    installRouter((location: any) => {
      router.routeChanged({
        location,
        routes,
        portal: this.shadowRoot.querySelector("#portal")
      });
      // Reset scroll position
      const scrollTarget = this.shadowRoot.querySelector("#portal");
      scrollTarget.scrollTo(0, 0);
      // Update store
      state.set({
        type: "app",
        data: { activeRoute: location.pathname },
        store
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
    this.drawerOpened = !this.drawerOpened;
    window.dispatchEvent(
      new CustomEvent("drawer-toggled", {
        composed: true
      })
    );
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

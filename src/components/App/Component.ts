import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";
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
  public static properties = Properties;
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened = false;
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
    this.media();
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
      log("Getting app level settings");
      await getAppSettings((document: any) => {
        state.set({ data: { settings: document }, store, type: "app" });
        if (!config.staticTheme) {
          const _theme = theme.convert(document.defaultTheme);
          theme.set(_theme, this);
        }
      });
      log("Finished gettings app settings");
    }
    debug.log("Getting user level settings");
    await firebase.getUser().then(async (_user: any) => {
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
    });
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

  public media() {
    media.subscribe((mediaSize: string) => {
      if (mediaSize === "mobile") this.drawerOpened = false;
      if (mediaSize === "desktop") this.drawerOpened = true;
      this.mediaSize = mediaSize;
    });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    router.setRoutes(routes);
    router.setPortal(this.shadowRoot.querySelector("#portal"));
    installRouter((location: any) => {
      router.routeChanged({
        location,
        routes,
        portal: this.shadowRoot.querySelector("#portal")
      });
      const scrollTarget = this.shadowRoot.querySelector("#content");
      scrollTarget.scrollTo(0, 0);
      state.set({
        type: "app",
        data: { activeRoute: location.pathname },
        store
      });
    });
  }

  // Handlers
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

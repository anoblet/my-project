import { LitElement, customElement, property } from "lit-element";
import { disableAnnyang, enableAnnyang } from "../Annyang";
import { documentToTheme, setTheme } from "../../Theme";
import { extract, getUserSettings, getUserTheme } from "../../User";
import { getDocument, initApp } from "../../../packages/firebase-helpers";
import { handleNavigation, setPortal, setRoutes } from "../../Router";

import GlobalStyle from "../../GlobalStyle";
import Style from "./AppStyle";
import { addReducer } from "../../State";
import { config } from "../../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { debug } from "../../Debug";
import { getUser } from "../../Firebase";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { routes } from "./Routes";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { store } from "../../Store";
import { subscribe } from "../../Media";
import template from "./AppComponentTemplate";
import { toast } from "../Toast/Toast";

import(/* webpackChunkName: "Imports" */ /* webpackPreload: true */ "./Imports");

@customElement("app-component")
export class AppComponent extends connect(store)(LitElement) {
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  public drawerOpened = false;
  @property({ type: Boolean }) public taskPending = true;

  // Lifecycle
  constructor() {
    super();
    debug("App is constructing");
    addReducer({ type: "app", store });
    addReducer({ type: "user", store });
    addReducer({ type: "theme", store });
    addReducer({ type: "settings", store });
    subscribe((mediaSize: string) => {
      if (mediaSize === "small") this.drawerOpened = false;
      if (mediaSize === "large") this.drawerOpened = true;
    });
    if (config.staticTheme) {
      const theme = documentToTheme(config.theme);
      setTheme(theme, this);
    }
  }

  public connectedCallback() {
    super.connectedCallback();
    (async () => {
      await initApp(config.firebase);
      if (config.globalSettings) {
        debug("Getting app settings");
        await getAppSettings((document: any) => {
          setState({ data: { settings: document }, store, type: "app" });
          if (!config.staticTheme) {
            const theme = documentToTheme(document.defaultTheme);
            setTheme(theme, this);
          }
        });
        debug("Finished gettings app settings");
      }
      debug("Getting user state");
      await getUser().then(async (user: any) => {
        if (user) {
          debug("User logged in");
          const userData = extract(user);
          setState({ data: userData, store, type: "user" });
          debug("Getting user settings");
          await getUserSettings((document: any) => {
            setState({ data: document, store, type: "settings" });
            this.handleAnnyang(document);
          });
          debug("Finished getting user settings");
          debug("Getting user theme");
          await getUserTheme((document: any) => {
            const theme = documentToTheme(document);
            setTheme(theme, this);
          });
          debug("Finished getting user theme");
        } else {
          debug("User not logged in");
        }
      });
      // document.querySelector("body #loading").setAttribute("hidden", "");
      this.taskPending = false;
    })();
    // Register drawer listeners
    this.registerlisteners();
  }

  public handleAnnyang(document: any) {
    document.annyangEnabled ? enableAnnyang() : disableAnnyang();
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public shouldUpdate(changedProperties: any) {
    if (this.taskPending) return false;
    return super.shouldUpdate(changedProperties);
  }

  public firstUpdated() {
    debug("First updated");
    this.registerRouter();
    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });
  }

  public async registerRouter() {
    setPortal(this.renderRoot.querySelector("#portal"));
    setRoutes(routes);
    await new Promise((resolve: any) => {
      installRouter(async (location: any) => {
        await handleNavigation({
          location,
          routes,
          portal: this.renderRoot.querySelector("#portal")
        });
        this.dispatchEvent(
          new CustomEvent("route-changed", {
            bubbles: true,
            composed: true,
            detail: location.pathname
          })
        );
        resolve();
      });
    });
  }

  // Handlers
  public _closeDrawer() {
    this.drawerOpened = false;
  }

  public _toggleDrawer() {
    const drawer: any = this.shadowRoot.querySelector("drawer-component");
    if (drawer) drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  public _toggleProfile() {
    const menu: any = this.shadowRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  public closeMenus() {
    this.drawerOpened = false;
    const menu: any = this.shadowRoot.querySelector("#profile-menu");
    menu.close();
  }

  public applyShadows() {
    const state = store.getState();
    if (state.settings.shadows)
      this.style.setProperty(
        "--box-shadow",
        "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      );
    else this.style.setProperty("--box-shadow", "initial");
  }

  public stateChanged() {
    this.requestUpdate();
  }

  public async beforeRender() {
    return true;
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    this.applyShadows();
    return template.bind(this)();
  }
}

const getAppSettings = (callback: any) => {
  return new Promise((resolve: any) =>
    getDocument({
      callback: (document: any) => {
        resolve(document ? callback(document) : false);
      },
      path: "app/settings",
      watch: true
    })
  );
};

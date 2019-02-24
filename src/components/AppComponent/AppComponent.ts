// import "../PageHome/PageHome";
import "../PageStatic";

import { LitElement, html, property } from "lit-element";
import {
  getDocument,
  getUser,
  initApp
} from "../../../packages/firebase-helpers";
import { disableAnnyang, enableAnnyang } from "../Annyang";
import { documentToTheme, setTheme } from "../../Theme";
import { extract, getUserSettings, getUserTheme } from "../../User";
import { handleNavigation, setPortal, setRoutes } from "../../Router";

import GlobalStyle from "../../GlobalStyle";
import { HelperMixin } from "../../../packages/HelperMixin";
import { MediaMixin } from "../../../packages/MediaMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import componentStyle from "./AppStyle";
import { config } from "../../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { debug } from "../../Debug";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { routes } from "./Routes";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { store } from "../../Store";
import template from "./AppComponentTemplate";

import(/* webpackChunkName: "Imports" */ "./imports");

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

export class AppComponent extends Mixin(connect(store)(LitElement), [
  HelperMixin,
  TaskMixin,
  StateMixin,
  MediaMixin
]) {
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  public drawerOpened = false;
  public taskPending = true;

  // Lifecycle
  constructor() {
    super();
    debug("App is constructing");
    this.setStore(store);
    this.addReducer("app");
    this.addReducer("user");
    this.addReducer("theme");
    this.addReducer("settings");
    if (this.mediaSize === "small") this.drawerOpened = false;
    if (this.mediaSize === "large") this.drawerOpened = true;
    if (config.staticTheme) {
      const theme = documentToTheme(config.theme);
      setTheme(theme, this);
    }
  }

  public connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      (async () => {
        await initApp(config.firebase);
        await (async () => {
          debug("Getting app settings");
          if (config.globalSettings)
            await getAppSettings((document: any) => {
              setState({ data: { settings: document }, store, type: "app" });
              if (!config.staticTheme) {
                const theme = documentToTheme(document.defaultTheme);
                setTheme(theme, this);
              }
            });
          debug("Finished gettings app settings");
        })();
        debug("Check redirect");
        // await checkRedirect();
        debug("Finished check redirect");
        await (async () => {
          debug("Getting user data");
          await getUser({
            callback: async (user: any) => {
              if (user) {
                const userData = extract(user);
                setState({ data: userData, store, type: "user" });
                debug("Getting user settings");
                await getUserSettings((document: any) => {
                  setState({ data: document, store, type: "settings" });
                  this.handleAnnyang(document);
                });
                debug("Finished getting user settings");
                // Load theme from Firebase
                debug("Getting user theme");
                await getUserTheme((document: any) => {
                  const theme = documentToTheme(document);
                  setTheme(theme, this);
                });
                debug("Finished getting user theme");
              }
            }
          });
          document.querySelector("body #loading").setAttribute("hidden", "");
          debug("Finished getting user data");
        })();
      })()
    ]);
    // Register drawer listeners
    this.registerlisteners();

    installOfflineWatcher((offline: boolean) => {
      return offline;
    });
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
  }

  public async registerRouter() {
    setPortal(this.renderRoot.querySelector("#portal"));
    setRoutes(routes);
    await new Promise((resolve: any) => {
      installRouter(async (location: any) => {
        this.dispatchEvent(
          new CustomEvent("route-changed", {
            bubbles: true,
            composed: true,
            detail: location.pathname
          })
        );
        await handleNavigation({
          location,
          routes,
          portal: this.renderRoot.querySelector("#portal")
        });
      });
    });
  }

  public _closeDrawer() {
    this.drawerOpened = false;
  }

  // Handlers
  public _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector("drawer-component");
    if (drawer) drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  public _toggleProfile() {
    const menu = this.shadowRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  public closeMenus() {
    this.drawerOpened = false;
    const menu = this.shadowRoot.querySelector("#profile-menu");
    menu.close();
  }

  public async beforeRender() {
    return true;
  }

  static get styles() {
    return [GlobalStyle, componentStyle];
  }

  public render() {
    const state = store.getState();
    return html`
      ${state.settings.shadows
        ? html`
            <style>
              :host {
                --box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                  0 3px 6px rgba(0, 0, 0, 0.23);
              }
            </style>
          `
        : ""}
      ${template.bind(this)(this.state)}
    `;
  }
}

window.customElements.define("app-component", AppComponent);

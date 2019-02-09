import "../PageHome/PageHome";

import { LitElement, html, property } from "lit-element";
import {
  checkRedirect,
  getDocument,
  getUser,
  initApp
} from "../../../packages/firebase-helpers";
import { handleNavigation, setPortal, setRoutes } from "../../Router";

import { HelperMixin } from "../../../packages/HelperMixin";
import { MediaMixin } from "../../../packages/MediaMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import componentStyle from "./AppStyle";
import { config } from "../../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { debug } from "../../Debug";
import globalStyle from "../../GlobalStyle";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { routes } from "./Routes";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { store } from "../../Store";
import template from "./AppComponentTemplate";
import { themeStructure } from "../ThemeComponent/ThemeStructure";
import { getUserTheme } from "../../User";

// import { customElement } from "lit-element";

import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex");
import(/* webpackChunkName: "MyGrid" */ "../../../packages/my-grid");
import(/* webpackChunkName: "MyLoader" */ "../../../packages/my-loader");
import(/* webpackChunkName: "MyCard" */ "../../../packages/my-card");
import(/* webpackChunkName: "MWCButton" */ "@material/mwc-button");
import(/* webpackChunkName: "MWCIcon" */ "@material/mwc-icon");
import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");
import(/* webpackChunkName: "AppHeader" */ "../AppHeader/AppHeader");
import(/* webpackChunkName: "AppFooter" */ "../AppFooter/AppFooter"); // @deprecated import(/* webpackChunkName: "AppTheme" */ "../AppTheme/AppTheme"),
import(/* webpackChunkName: "Drawer" */ "../DrawerComponent/Drawer");
import(/* webpackChunkName: "ProfileMenu" */ "../ProfileMenu/ProfileMenu"); // @deprecated
import(/* webpackChunkName: "AdminComponent" */ "../AdminComponent/AdminComponent");
import(/* webpackChunkName: "Breadcrumb" */ "../BreadcrumbComponent/Breadcrumb");
import(/* webpackChunkName: "LogComponent" */ "../LogComponent/LogComponent");
import(/* webpackChunkName: "ThemeComponent" */ "../ThemeComponent/ThemeComponent");
import(/* webpackChunkName: "MediaQuery" */ "../../../packages/MediaQuery");
import(/* webpackChunkName: "MenuComponent" */ "../MenuComponent/MenuComponent");
import(/* webpackChunkName: "MenuComponent" */ "../MenuComponent/MenuComponent");
import(/* webpackChunkName: "ToastComponent" */ "../ToastComponent/ToastComponent");

const getAppSettings = () => {
  return getDocument({
    path: `app/settings`
  }).then((document: any) => {
    const app = {
      settings: document
    };
    setState({ data: app, store, type: "app" });
    setDefaultTheme(document.defaultTheme);
  });
};

const setDefaultTheme = (theme: any) => {
  setState({ data: theme, store, type: "theme" });
};

export class AppComponent extends Mixin(connect(store)(LitElement), [
  HelperMixin,
  TaskMixin,
  StateMixin,
  MediaMixin
]) {
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  public drawerOpened = false;
  public firebaseConfig = config.firebase;
  public taskPending = true;
  @property() public template: any = template;

  // Lifecycle
  constructor() {
    super();
    debug("App is constructing");
    this.setStore(store);
    this.addReducer("app");
    this.addReducer("user");
    this.addReducer("theme");
    this.addReducer("settings");
  }

  public connectedCallback() {
    super.connectedCallback();
    // Let's set a default theme
    debug("Setting default theme");
    this.runTasks([
      new Promise(async resolve => {
        debug("Run init methods");
        await initApp(this.firebaseConfig);
        await getAppSettings();
        await checkRedirect();
        await getUser({
          callback: async (user: any) => {
            // Client is not logged in, nor pending redirect
            if (!user) {
              debug("User is not logged in");
              this.setState({}, "user");
              resolve();
            } else {
              // Client is logged in
              debug("User is logged in");
              // Get the most useful information
              const userModel = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                signedIn: true,
                uid: user.uid
              };
              // Map to state (document): user
              await setState({ data: userModel, store, type: "user" });
              // Load theme from Firebase
              await getUserTheme();
              // Load settings from firebaseConfig
              await new Promise(resolve =>
                getDocument({
                  path: `users/${user.uid}/settings/default`,
                  callback: (document: any) => {
                    setState({ data: document, store, type: "settings" });
                    resolve();
                  },
                  watch: true
                })
              );
            }
            debug("App component is updated");
            resolve();
          }
        });
      })
    ]);

    // Register drawer listeners
    this.registerlisteners();

    installOfflineWatcher((offline: boolean) => {});
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
    this.dispatchEvent(
      new CustomEvent("app-loaded", {
        bubbles: true,
        composed: true
      })
    );
    setPortal(this.renderRoot.querySelector("#portal"));
    setRoutes(routes);
    installRouter((location: any) =>
      handleNavigation({
        location,
        routes,
        portal: this.renderRoot.querySelector("#portal")
      })
    );
  }

  public _closeDrawer() {
    this.drawerOpened = false;
  }

  // Handlers
  public _toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  public _toggleProfile() {
    const menu = this.shadowRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  closeMenus() {
    this.drawerOpened = false;
    const menu = this.shadowRoot.querySelector("#profile-menu");
    menu.close();
  }

  public updateStyles(theme: any) {
    themeStructure.map((field: any) => {
      if (theme[field.property]) {
        if (!field.varName) {
          const parts = field.property.split(/(?=[A-Z])/);
          const property = parts.join("-");
          this.style.setProperty(`--${property}`, theme[field.property]);
        } else this.style.setProperty(field.varName, theme[field.property]);
      }
    });
  }

  // State
  public stateChanged(state: any) {
    super.stateChanged(state);
    const theme = state.theme;
    if (theme) {
      this.updateStyles(theme);
    }
  }

  static get styles() {
    return [globalStyle, componentStyle];
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
      ${this.template(this.state)}
    `;
  }
}

window.customElements.define("app-component", AppComponent);

import { LitElement, customElement, html, property } from "lit-element";
import { HelperMixin } from "../../../packages/HelperMixin";
import { MediaMixin } from "../../../packages/MediaMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { config } from "../../../config";
import { store } from "../../Store";
import {
  checkRedirect,
  getDocument,
  getUser,
  initApp
} from "../../../packages/firebase-helpers";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { themeStructure } from "../ThemeComponent/ThemeStructure";

// pwa-helpers
import { connect } from "pwa-helpers/connect-mixin.js";
import { installRouter } from "pwa-helpers/router.js";
import { installOfflineWatcher } from "pwa-helpers/network.js";

import template from "./AppComponentTemplate";

// styles
import componentStyle from "./AppStyle";
import globalStyle from "../../GlobalStyle";

import { log } from "../../Debug";

import { handleNavigation, setPortal, setRoutes } from "../../Router";
import { routes } from "./Routes";
import "../PageHome/PageHome"

export class AppComponent extends Mixin(connect(store)(LitElement), [
  HelperMixin,
  TaskMixin,
  StateMixin,
  MediaMixin
]) {
  @property({ type: String }) public title = "Andrew Noblet";
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  public drawerOpened = false;
  public firebaseConfig = config.firebase;
  public taskPending = true;
  @property() public template: any = template;
  // public componentStyle: any = style;

  // Lifecycle
  constructor() {
    super();
    log("App is constructing");
    this.setStore(store);
    this.addReducer("app"), this.addReducer("user"), this.addReducer("theme");
    this.addReducer("settings");
  }

  connectedCallback() {
    super.connectedCallback();
    // Let's set a default theme
    log("Setting default theme");
    setState({ data: config.defaultTheme, store: store, type: "theme" });
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex"),
      import(/* webpackChunkName: "MyGrid" */ "../../../packages/my-grid"),
      import(/* webpackChunkName: "MyLoader" */ "../../../packages/my-loader"),
      import(/* webpackChunkName: "MyCard" */ "../../../packages/my-card"),
      import(/* webpackChunkName: "MWC-Icon" */ "@material/mwc-icon"),
      import(/* webpackChunkName: "MWC-Fab" */ "@material/mwc-fab"),
      import(/* webpackChunkName: "AppHeader" */ "../AppHeader/AppHeader"),
      import(/* webpackChunkName: "AppFooter" */ "../AppFooter/AppFooter"),
      import(/* webpackChunkName: "AppTheme" */ "../AppTheme/AppTheme"),
      import(/* webpackChunkName: "PostController" */ "../../post/PostController"),
      import(/* webpackChunkName: "UserController" */ "../../controllers/UserController"),
      import(/* webpackChunkName: "UserSettings" */ "../../User/SettingsComponent"),
      import(/* webpackChunkName: "PageInfo" */ "../PageInfo/PageInfo"),
      import(/* webpackChunkName: "Drawer" */ "../DrawerComponent/Drawer"),
      import(/* webpackChunkName: "ProfileMenu" */ "../ProfileMenu/ProfileMenu"),
      import(/* webpackChunkName: "AdminComponent" */ "../AdminComponent/AdminComponent"),
      import(/* webpackChunkName: "Breadcrumb" */ "../BreadcrumbComponent/Breadcrumb"),
      import(/* webpackChunkName: "LogComponent" */ "../LogComponent/LogComponent"),
      import(/* webpackChunkName: "ThemeComponent" */ "../ThemeComponent/ThemeComponent"),
      import(/* webpackChunkName: "MediaQuery" */ "../../../packages/MediaQuery"),
      import(/* webpackChunkName: "MenuComponent" */ "../MenuComponent/MenuComponent"),
      new Promise(async resolve => {
        log("Run init methods");
        await initApp(this.firebaseConfig);
        // await initStore();
        await checkRedirect();
        await getUser({
          callback: async (user: any) => {
            // Client is not logged in, nor pending redirect
            if (!user) {
              log("User is not logged in");
              this.setDefaultTheme();
              resolve();
            }
            // Client is logged in
            if (user) {
              log("User is logged in");
              // Get the most useful information
              const userModel = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                signedIn: true,
                uid: user.uid
              };
              // Load theme from Firebase
              await new Promise(resolve => {
                getDocument({
                  path: `users/${user.uid}/settings/theme`,
                  callback: (document: any) => {
                    if (document) {
                      this.setState(document.currentTheme, "theme");
                    }
                    resolve();
                  },
                  watch: true
                });
              });
              // Map to state (document): user
              await setState({ data: userModel, store: store, type: "user" });
              // Load settings from firebaseConfig
              await new Promise(resolve => {
                getDocument({
                  path: `users/${user.uid}/settings/default`,
                  callback: (document: any) => {
                    this.setState({ settings: document }, "app");
                    this.setState(document, "settings");
                    resolve();
                  },
                  watch: true
                });
              });
            } else this.setState({}, "user");
            resolve();
          }
        });
      })
    ]);

    // Let's override mode
    log("Set default mode");
    this.setState({ settings: { mode: 1 } }, "app");

    // Register drawer listeners
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);

    installOfflineWatcher((offline: boolean) => {});
  }

  shouldUpdate(changedProperties: any) {
    if (this.taskPending) return false;
    return super.shouldUpdate(changedProperties);
  }

  firstUpdated() {
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

  _closeDrawer() {
    this.drawerOpened = false;
  }

  setDefaultTheme() {
    this.setState(config.defaultTheme, "theme");
  }

  // Events
  public _toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  public _toggleProfile() {
    const menu = this.shadowRoot.querySelector("#profile-menu");
    if (menu.hidden) menu.open();
    else menu.close();
    // this._toggleAttribute("hidden", menu);
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
    return html`
      ${this.template(this.state)}
    `;
  }
}

window.customElements.define("app-component", AppComponent);

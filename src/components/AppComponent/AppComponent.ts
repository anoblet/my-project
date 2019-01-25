import { LitElement, css, customElement, html, property } from "lit-element";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { HelperMixin } from "../../../packages/HelperMixin";
import { MediaMixin } from "../../../packages/MediaMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import Template from "./AppComponentTemplate";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import { config } from "../../../config";
import { runtime } from "../../Runtime";
import { store } from "../../Store";
import {
  checkRedirect,
  getDocument,
  getUser,
  initApp,
  initStore,
  updateDocument
} from "../../../packages/firebase-helpers";
import { setState } from "../../../packages/state-helpers/state-helpers";
import { themeStructure } from "../ThemeComponent/ThemeStructure";

import { connectRouter } from "lit-redux-router";

// pwa-helpers
import { connect } from "pwa-helpers/connect-mixin.js";
import { installRouter } from "pwa-helpers/router.js";
import { installOfflineWatcher } from "pwa-helpers/network.js";

// styles
import componentStyle from "./AppStyle";
import globalStyle from "../../GlobalStyle";

import { log } from "../../Debug";

var pathToRegexp = require("path-to-regexp");


connectRouter(store);

const load = (modules: any = [], callback: any) => {
  let dependencies: any = [
    import(/* webpackChunkName: "Firebase" */ "firebase/app")
  ];
  if (modules.includes("auth"))
    dependencies.push(
      // @ts-ignore
      import(/* webpackChunkName: "Firebase" */ "firebase/auth")
    );
  if (modules.includes("firestore"))
    dependencies.push(
      // @ts-ignore
      import(/* webpackChunkName: "Firebase" */ "firebase/firestore")
    );

  // Promise.all(dependencies).then(([firebase]) => callback(firebase));
  Promise.all(dependencies).then(([firebase]) => (window.firebase = firebase));
};

load("auth", "firestore");

export class AppComponent extends Mixin(connect(store)(LitElement), [
  HelperMixin,
  // TemplateMixin,
  TaskMixin,
  StateMixin,
  FirebaseMixin,
  MediaMixin
]) {
  @property({ type: String }) public title = "Andrew Noblet";
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  public drawerOpened = false;
  public firebaseConfig = config.firebase;
  public taskPending = false;
  public template: any = Template;
  // public componentStyle: any = style;

  // Lifecycle
  constructor() {
    super();
    log("App is constructing");
    this.setStore(store);
    this.addReducer("app"), this.addReducer("user"), this.addReducer("theme");
    this.addReducer("settings");
    // installRouter((location: any) => this.handleNavigation(location));
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
      import(/* webpackChunkName: "PageHome" */ "../PageHome/PageHome"),
      import(/* webpackChunkName: "PostController" */ "../../post/PostController"),
      import(/* webpackChunkName: "UserController" */ "../../controllers/UserController"),
      import(/* webpackChunkName: "UserSettings" */ "../../User/SettingsComponent"),
      import(/* webpackChunkName: "PageInfo" */ "../PageInfo/PageInfo"),
      import(/* webpackChunkName: "Drawer" */ "../DrawerComponent/Drawer"),
      import(/* webpackChunkName: "ProfileMenu" */ "../ProfileMenu/ProfileMenu"),
      import(/* webpackChunkName: "Contact" */ "../Contact/Contact"),
      import(/* webpackChunkName: "AdminComponent" */ "../AdminComponent/AdminComponent"),
      import(/* webpackChunkName: "Breadcrumb" */ "../BreadcrumbComponent/Breadcrumb"),
      import(/* webpackChunkName: "PageComponents" */ "../PageComponents/PageComponents"),
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

  _closeDrawer() {
    this.drawerOpened = false;
  }

  setDefaultTheme() {
    this.setState(config.defaultTheme, "theme");
  }

  async onUserLoggedIn(user: any) {
    console.log(this.state);
    this.setState(user, "user");
    return Promise.all([
      this.watchDocumentNew({
        path: `users/${this.state.user.uid}/settings/default`,
        callback: (document: any) => {
          if (document) {
            this.setState(document, "settings");
          }
        }
      }),
      this.watchDocumentNew({
        path: `users/${this.state.user.uid}/state/theme`,
        callback: (document: any) => {
          return new Promise((resolve, reject) => {
            if (document) {
              this.setState(document, "theme");
              resolve();
            }
          });
        }
      })
    ]);
  }

  handleNavigation(location: any) {
    const routes = [
      {
        name: "post",
        path: "/post",
        src: "PostController"
      },
      {
        name: "post.action",
        path: "/post/:action",
        src: "PostController"
      }
    ];

    let matchedRoute: any;
    routes.map((route: any) => {
      const regex = pathToRegexp(route.path);
      const match = regex.exec(location.pathname);
      if (match) matchedRoute = route;
    });
    if (matchedRoute)
      switch (matchedRoute.name) {
        case "post": {
          import("../../post/PostController");
        }
        case "post.action": {
          import("../../post/PostController");
        }
      }

    const page = this.shadowRoot.querySelector("#page");
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
      const test = "";
      if (!field.varName) {
        console.log(field);
        const parts = field.property.split(/(?=[A-Z])/);
        const property = parts.join("-");
        this.style.setProperty(`--${property}`, theme[field.property]);
      } else this.style.setProperty(field.varName, theme[field.property]);
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
      <my-loader ?hidden="${!this.taskPending}"></my-loader>

      ${!this.taskPending
        ? this.template(this.state)
        : html`
            <my-loader></my-loader>
          `}
    `;
  }
}

window.customElements.define("app-component", AppComponent);

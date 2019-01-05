import("../../../packages/DrawerAbsolute");
import("../../../packages/MediaQuery");

import * as style from "./MyApp.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { HelperMixin } from "../../../packages/HelperMixin";
import { MediaMixin } from "../../../packages/MediaMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import Template from "./MyAppTemplate";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import { config } from "../../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { connectRouter } from "lit-redux-router";
import { installRouter } from "pwa-helpers/router.js";
import { runtime } from "../../Runtime";
import { store } from "../../store.js";

import(/* webpackChunkName: "PostController" */ "../../controllers/PostController");
import(/* webpackChunkName: "UserController" */ "../../controllers/UserController");
import(/* webpackChunkName: "UserSettings" */ "../../User/SettingsComponent");
import(/* webpackChunkName: "PageInfo" */ "../PageInfo/PageInfo");

var pathToRegexp = require("path-to-regexp");

connectRouter(store);

export class MyApp extends Mixin(connect(store)(LitElement), [
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
  public defaultDocument = {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    primaryColor: "#666666",
    secondaryColor: "#000000",
    textColor: "#000000"
  };
  public firebaseConfig = config.firebase;
  public taskPending = false;
  public template: any = Template;
  public componentStyle: any = style;

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
    this.addReducer("app"), this.addReducer("user"), this.addReducer("theme");
    this.addReducer("settings");
    this.setDefaultTheme();
    // installRouter((location: any) => this.handleNavigation(location));
  }

  firstUpdated() {
    super.firstUpdated();
    this.taskChain([
      import(/* webpackChunkName: "MyFlex" */ "../../../packages/my-flex"),
      import(/* webpackChunkName: "MyGrid" */ "../../../packages/my-grid"),
      import(/* webpackChunkName: "MyLoader" */ "../../../packages/my-loader"),
      import(/* webpackChunkName: "MyCard" */ "../../../packages/my-card"),
      import(/* webpackChunkName: "MWC-Icon" */ "@material/mwc-icon"),
      import(/* webpackChunkName: "MWC-Fab" */ "@material/mwc-fab"),
      import(/* webpackChunkName: "AppDrawer" */ "../AppDrawer/AppDrawer"),
      import(/* webpackChunkName: "AppHeader" */ "../AppHeader/AppHeader"),
      import(/* webpackChunkName: "AppFooter" */ "../AppFooter/AppFooter"),
      import(/* webpackChunkName: "AppTheme" */ "../AppTheme/AppTheme"),
      import(/* webpackChunkName: "PageHome" */ "../PageHome/PageHome"),
      this.firebaseInit(),
      this.firebaseCheckRedirect(),
      this.getUser().then(async (user: any) => {
        if (user) await this.onUserLoggedIn(user);
        else this.setState({}, "user");
      })
    ]);
  }

  setDefaultTheme() {
    this.setState(this.defaultDocument, "theme");
  }

  async onUserLoggedIn(user: any) {
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
          import("../../controllers/PostController");
        }
        case "post.action": {
          import("../../controllers/PostController");
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
    this._toggleAttribute("hidden", menu);
  }

  public updateStyles(theme: any) {
    this.style.setProperty("--background-color", theme.backgroundColor);
    this.style.setProperty("--text-color", theme.textColor);
    this.style.setProperty("--primary-color", theme.primaryColor);
    this.style.setProperty("--secondary-color", theme.secondaryColor);
  }

  // State
  public stateChanged(state: any) {
    super.stateChanged(state);
    this.state = state;
    if (state.theme) {
      this.updateStyles(state.theme);
    }
  }

  public render() {
    return html`
      <style>
        ${this.componentStyle}
      </style>
      ${
        !this.taskPending
          ? this.template(this.state)
          : html`
              <my-loader></my-loader>
            `
      }
    `;
  }
}

window.customElements.define("my-app", MyApp);

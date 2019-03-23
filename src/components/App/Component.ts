import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { config } from "../../../config";
import { db } from "../../Database";
import { debug } from "../../Debug";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { media } from "../../Media";
import { router } from "../../Router";
import { routes } from "./Routes";
import { addReducer, setState } from "../../State";
import { store } from "../../Store";
import { theme } from "../../Theme";
import { toast } from "../Toast/Toast";
import { user } from "../../User";

@customElement("app-component")
export class AppComponent extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  @property({ type: Boolean })
  public taskPending = true;
  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened = false;
  @property() public mediaSize: string;

  // Lifecycle
  constructor() {
    super();
    debug.log("Constructor");
    this.addReducers();
    this.media();

    // Global theme
    if (config.staticTheme) {
      theme.set(theme.convert(config.theme), this);
      setState({
        type: "app",
        data: { settings: { theme: config.theme } },
        store
      });
    }
  }

  public connectedCallback() {
    super.connectedCallback();
    this.beforeRender().then(() => {
      document.querySelector("#loading").removeAttribute("enabled");
      this.taskPending = false;
    });

    // Register drawer listeners
    this.registerlisteners();
  }

  public async beforeRender() {
    await db.initApp(config.firebase);
    if (config.globalSettings) {
      debug.log("Getting app level settings");
      await getAppSettings((document: any) => {
        setState({ data: { settings: document }, store, type: "app" });
        if (!config.staticTheme) {
          const _theme = theme.convert(document.defaultTheme);
          theme.set(_theme, this);
        }
      });
      debug.log("Finished gettings app settings");
    }
    debug.log("Getting user level settings");
    await db.getUser().then(async (_user: any) => {
      if (_user) {
        debug.log("User logged in");
        const userData = user.extract(_user);
        setState({ data: userData, store, type: "user" });
        debug.log("Getting user settings");
        await user.getUserSettings((document: any) => {
          setState({ data: { settings: document }, store, type: "user" });
        });
        debug.log("Finished getting user settings");
        debug.log("Getting user theme");
        await user.getUserTheme((document: any) => {
          theme.set(theme.convert(document), this);
        });
        debug.log("Finished getting user theme");
      } else {
        debug.log("User not logged in");
      }
    });
    debug.log("Finished getting user");
  }

  public shouldUpdate(changedProperties: any) {
    return !this.taskPending && super.shouldUpdate(changedProperties);
  }

  public firstUpdated() {
    debug.log("First updated");
    store.subscribe(() => this.requestUpdate());
    this.registerRouter();
    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return Template.bind(this)();
  }

  public media() {
    media.subscribe((mediaSize: string) => {
      if (mediaSize === "mobile") this.drawerOpened = false;
      if (mediaSize === "desktop") this.drawerOpened = true;
      this.mediaSize = mediaSize;
    });
  }

  public addReducers() {
    addReducer({ type: "app", store });
    addReducer({ type: "user", store });
    addReducer({ type: "settings", store });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    router.setRoutes(routes);
    router.setPortal(this.shadowRoot.querySelector("#portal"));
    await new Promise((resolve: any) => {
      installRouter(async (location: any) => {
        await router.routeChanged({
          location,
          routes,
          portal: this.shadowRoot.querySelector("#portal")
        });
        setState({
          type: "app",
          data: { activeRoute: location.pathname },
          store
        });
        resolve();
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

  public applyShadows() {
    const state = store.getState();
    if (state.settings.shadows)
      this.style.setProperty(
        "--box-shadow",
        "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      );
    else this.style.setProperty("--box-shadow", "initial");
  }
}

// Utility function
const getAppSettings = (callback: any) => {
  return new Promise((resolve: any, reject: any) =>
    db.getDocument({
      callback: (document: any) => {
        document
          ? resolve(callback(document))
          : reject(new Error("Could not retrieve document"));
      },
      path: "app/settings",
      watch: true
    })
  );
};

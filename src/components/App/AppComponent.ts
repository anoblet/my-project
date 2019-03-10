import { LitElement, customElement, property } from "lit-element";
import { documentToTheme, setTheme } from "../../Theme";
import { extract, getUserSettings, getUserTheme } from "../../User";
import { getDocument, getUser, initApp } from "../../Firebase";
import { routeChanged, setPortal, setRoutes } from "../../Router";

import GlobalStyle from "../../GlobalStyle";
import Style from "./AppStyle";
import { addReducer } from "../../State";
import { config } from "../../../config";
import { debug } from "../../Debug";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { routes } from "./Routes";
import { setState } from "../../State";
import { store } from "../../Store";
import { media } from "../../Media";
import template from "./AppTemplate";
import { toast } from "../Toast/Toast";

@customElement("app-component")
export class AppComponent extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "drawer-opened" })
  @property({ type: Boolean })
  public taskPending = true;
  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened = false;
  @property() public mediaSize: string;

  public media() {
    media.subscribe((mediaSize: string) => {
      // if (!this.taskPending) toast(mediaSize);
      if (mediaSize === "mobile") this.drawerOpened = false;
      if (mediaSize === "desktop") this.drawerOpened = true;
      this.mediaSize = mediaSize;
    });
  }

  public reducers() {
    addReducer({ type: "app", store });
    addReducer({ type: "user", store });
    addReducer({ type: "settings", store });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    setRoutes(routes);
    setPortal(this.shadowRoot.querySelector("#portal"));
    await new Promise((resolve: any) => {
      installRouter(async (location: any) => {
        await routeChanged({
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
        composed: true,
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

  // Lifecycle
  constructor() {
    super();
    debug("Constructor");
    this.reducers();
    this.media();

    if (config.staticTheme) {
      setTheme(documentToTheme(config.theme), this);
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
    await initApp(config.firebase);
    if (config.globalSettings) {
      debug("Getting app level settings");
      await getAppSettings((document: any) => {
        setState({ data: { settings: document }, store, type: "app" });
        if (!config.staticTheme) {
          const theme = documentToTheme(document.defaultTheme);
          setTheme(theme, this);
        }
      });
      debug("Finished gettings app settings");
    }
    debug("Getting user level settings");
    await getUser().then(async (user: any) => {
      if (user) {
        debug("User logged in");
        const userData = extract(user);
        setState({ data: userData, store, type: "user" });
        debug("Getting user settings");
        await getUserSettings((document: any) => {
          setState({ data: { settings: document }, store, type: "user" });
          // setState({ data: document, store, type: "settings" });
        });
        debug("Finished getting user settings");
        debug("Getting user theme");
        await getUserTheme((document: any) => {
          setTheme(documentToTheme(document), this);
        });
        debug("Finished getting user theme");
      } else {
        debug("User not logged in");
      }
    });
    debug("Finished getting user");
  }

  public shouldUpdate(changedProperties: any) {
    return !this.taskPending && super.shouldUpdate(changedProperties);
  }

  public firstUpdated() {
    debug("First updated");
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
    this.applyShadows();
    return template.bind(this)();
  }
}

// Utility function
const getAppSettings = (callback: any) => {
  return new Promise((resolve: any, reject: any) =>
    getDocument({
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

const reducers = () => {
  addReducer({ type: "app", store });
  addReducer({ type: "user", store });
  addReducer({ type: "theme", store });
  addReducer({ type: "settings", store });
};

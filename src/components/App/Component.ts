import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";
import { config } from "../../../config";
import { db } from "../../Database";
import { firebase } from "../../Firebase";
import { debug } from "../../Debug";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { media } from "../../Media";
import { router } from "../../Router";
import { routes } from "./Routes";
import { setState } from "../../State";
import { store } from "../../Store";
import { theme } from "../../Theme";
import { toast } from "../Toast/Toast";
import { user } from "../../User";
import { BeforeRender } from "../../mixins/BeforeRender";
import { addReducers } from "./Helpers";

@customElement("app-component")
export class App extends BeforeRender(LitElement) {
  public static properties = Properties;
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render = this.template.bind(this);

  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened = false;
  @property() public mediaSize: string;
  private performance: any;

  // Lifecycle
  constructor() {
    super();
    debug.log("Constructor");
    addReducers();
    if (config.staticTheme) {
      theme.set(theme.convert(config.theme), this);
      setState({
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
    // this.performance = _firebase.performance();
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
          setState({
            type: "app",
            data: { settings: { theme: document } },
            store
          });
        });
        debug.log("Finished getting user theme");
      } else {
        debug.log("User not logged in");
      }
    });
    debug.log("Finished getting user");

    document.querySelector("#loading").removeAttribute("enabled");
  }

  public firstUpdated() {
    debug.log("First updated");
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
      setState({
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

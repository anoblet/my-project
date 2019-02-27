import { LitElement, customElement, html, property } from "lit-element";
import { store } from "../../Store";

import GlobalStyle from "../../GlobalStyle";
import style from "./BreadcrumbStyle";

@customElement("breadcrumb-component")
export class BreadcrumbComponent extends LitElement {
  @property() public activeRoute: string = "/";
  @property({ type: Boolean }) public hidden: boolean = false;

  public constructor() {
    super();
    store.subscribe(() => {
      const state = store.getState();
      this.activeRoute = state.app.activeRoute;

    });
  }

  public routeChanged(route: string) {
    this.activeRoute = route;
  }

  static get styles() {
    return [GlobalStyle, style];
  }

  public formatRoute(route: string) {
    if (route === "/") this.hidden = true;
    else {
      this.hidden = false;
    }
    const parts = route.split("/");
    // Remove first entry if just '/'
    parts.shift();
    // Declare an empty base
    let baseHref = "";
    const formattedRoute = html`
      ${parts.map((part: string, index: number) => {
        baseHref += `/${part}`;
        return html`
          <span
            >${index
              ? html`
                  /
                `
              : ""} <a class="primary" href="${baseHref}">${part}</a></span
          >
        `;
      })}
    `;
    return formattedRoute;
  }

  public render() {
    return html`
      <div>${this.formatRoute(this.activeRoute)}/</div>
    `;
  }
}

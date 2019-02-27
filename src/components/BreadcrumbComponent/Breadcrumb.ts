import { LitElement, customElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import style from "./BreadcrumbStyle";

@customElement("breadcrumb-component")
export class BreadcrumbComponent extends LitElement {
  @property() public activeRoute: string = "/";
  @property({ type: Boolean }) public hidden: boolean = false;

  public constructor() {
    super();
    this.routeChanged = this.routeChanged.bind(this);
  }

  public connectedCallback() {
    super.connectedCallback();
    document.addEventListener("route-changed", this.routeChanged);
  }

  public routeChanged(e: any) {
    this.activeRoute = e.detail;
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

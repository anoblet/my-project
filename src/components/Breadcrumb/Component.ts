import { LitElement, customElement, html, property } from "lit-element";
import { store } from "../../Store";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("breadcrumb-component")
export class BreadcrumbComponent extends LitElement {
  @property() public activeRoute: string;
  @property({ type: Boolean }) public hidden: boolean = false;
  public template = Template;

  public static styles = [GlobalStyle, Style];

  public render() {
    return this.template.bind(this)();
  }

  public constructor() {
    super();
    store.subscribe(() => {
      this.syncActiveRoute();
    });
    this.syncActiveRoute();
  }

  public syncActiveRoute() {
    const state = store.getState();
    this.activeRoute = state.app.activeRoute;
  }

  public format(route: string) {
    if (!route) return;
    const parts = route.split("/");
    parts.shift();
    let href = "";
    return html`
      ${parts.map((part: string) => {
        if (part) href += `/${part}`;
        return html`
          <a class="primary" href="${href}" aria-label="${part ? part : "Home"}"
            >${part}</a
          >
          /
        `;
      })}
    `;
  }
}

import { css, customElement, html, LitElement, property } from "lit-element";
import style from "./BreadcrumbStyle";
import GlobalStyle from "../../GlobalStyle";
import template from "./BreadcrumbTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

//@customElement("breadcrumb-component")
export class BreadcrumbComponent extends connect(store)(LitElement) {
  @property() activeRoute: string;
  @property({ type: Boolean }) hidden: boolean = false;
  static get styles() {
    return [GlobalStyle, style];
  }

  formatRoute(route: string) {
    if (route === "/") this.hidden = true;
    else {
      this.hidden = false;
    }
    let parts = route.split("/");
    // Remove first entry if just '/'
    parts.shift();
    // Declare an empty base
    let base = "";
    const formattedRoute = html`
      ${
        parts.map((part: string, index: number) => {
          base += `/${part}`;
          return html`
            <span
              >${
                index
                  ? html`
                      /
                    `
                  : ""
              } <a class="primary" href="${base}">${part}</a></span
            >
          `;
        })
      }
    `;
    return formattedRoute;
  }

  stateChanged(state: any) {
    this.activeRoute = state.router.activeRoute;
  }

  render() {
    return html`
      <div>${this.formatRoute(this.activeRoute)}/</div>
    `;
  }
}

window.customElements.define("breadcrumb-component", BreadcrumbComponent);

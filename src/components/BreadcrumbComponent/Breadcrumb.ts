import { css, customElement, html, LitElement, property } from "lit-element";
import style from "./BreadcrumbStyle";
import template from "./BreadcrumbTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

//@customElement("breadcrumb-component")
export class BreadcrumbComponent extends connect(store)(LitElement) {
  @property() activeRoute: string;
  static get styles() {
    return [style];
  }

  formatRoute(route: string) {
    let parts = route.split("/");
    parts.shift();
    let base = "";
    const formattedRoute = html`
      ${
        parts.map((part: string) => {
          base += `/${part}`;
          return html`
            /<a href="${base}">${part}</a>
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
      ${this.formatRoute(this.activeRoute)}
    `;
  }
}

window.customElements.define("breadcrumb-component", BreadcrumbComponent);

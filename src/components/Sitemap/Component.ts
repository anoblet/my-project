import { LitElement, css, customElement, html, property } from "lit-element";

import { generateSitemap } from "./Sitemap";
import { routes } from "../AppComponent/Routes";
import GlobalStyle from "../../GlobalStyle"

@customElement("sitemap-component")
class Sitemap extends LitElement {
  @property() public template: any;

  static get styles() {
    return [GlobalStyle, css`
      :host {
        flex: 1;
      }
    `];
  }

  public render() {
    return html`
      <card-component title="Sitemap">
        ${generateSitemap(routes)}
      </card-component>
    `;
  }
}

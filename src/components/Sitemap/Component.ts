import { LitElement, customElement, html, property } from "lit-element";

import { generateSitemap } from "./Sitemap";
import { routes } from "../App/Routes";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";

@customElement("sitemap-component")
export class Sitemap extends LitElement {
  @property() public template: any;

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return html`
      <card-component title="Sitemap">
        ${generateSitemap(routes)}
      </card-component>
    `;
  }
}

import { LitElement, customElement, html, property } from "lit-element";

import { generateSitemap } from "./Sitemap";
import { routes } from "../App/Routes";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";

@customElement("sitemap-component")
export class Sitemap extends LitElement {
  @property() public template: any;

  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
      <card-component title="Sitemap">
        ${generateSitemap(routes)}
      </card-component>
    `;
  }
}

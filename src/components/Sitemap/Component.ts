import { LitElement, customElement, html, property } from "lit-element";
import { generateSitemap } from "./Sitemap";
import { routes } from "../AppComponent/Routes";

@customElement("sitemap-component")
class Sitemap extends LitElement {
  @property() public template: any;

  public render() {
    return html`
      <card-component title="Sitemap">
        ${generateSitemap(routes)}
      </card-component>
    `;
  }
}

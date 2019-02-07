import { LitElement, customElement, property } from "lit-element";
import { generateSitemap } from "./Sitemap";
import { routes } from "../AppComponent/Routes";

@customElement("sitemap-component")
class Sitemap extends LitElement {
  @property() template: any;

  render() {
    return generateSitemap(routes);
  }
}

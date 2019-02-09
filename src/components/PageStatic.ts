import { LitElement, customElement, html, property } from "lit-element";


@customElement("sitemap-component")
class Sitemap extends LitElement {
  @property() public template: any;

  public render() {
    return html`
      <card-component title="Welcome">
        Welcome!
      </card-component>
    `;
  }
}

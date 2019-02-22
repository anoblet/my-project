import { LitElement, property } from "lit-element";
import Template from "./MyCardTemplate";

export class MyCard extends LitElement {
  @property({ type: Boolean }) public collapsible: any = false;
  @property({ type: Boolean, reflect: true }) public collapsed: any = false;

  public firstUpdated(changedProperties: any) {
    // changedProperties is a map type
    this.addListeners();
    // Just in case
    if (super.firstUpdated) super.firstUpdated(changedProperties);
  }

  public toggle() {
    this.collapsed = !this.collapsed;
  }

  public addListeners() {
    if (this.collapsible) {
      const title = this.shadowRoot.querySelector("#title");
      title.addEventListener("click", () => this.toggle());
    }
  }

  public render() {
    return Template.bind(this)({});
  }
}

window.customElements.define("my-card", MyCard);

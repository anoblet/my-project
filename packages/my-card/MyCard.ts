import { LitElement, property } from "lit-element";
import Template from "./MyCardTemplate";

export class MyCard extends LitElement {
  @property({ type: Boolean }) collapsible: any = false;
  @property({ type: Boolean, reflect: true }) collapsed: any = false;

  firstUpdated(changedProperties: any) {
    // changedProperties is a map type
    this.addListeners();
    // Just in case
    if (super.firstUpdated) super.firstUpdated(changedProperties);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  addListeners() {
    if (this.collapsible) {
      const title = this.shadowRoot.querySelector("#title");
      title.addEventListener("click", () => this.toggle());
    }
  }

  render() {
    return Template.bind(this)({});
  }
}

window.customElements.define("my-card", MyCard);

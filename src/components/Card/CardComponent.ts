import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("card-component")
export class CardComponent extends LitElement {
  @property({ type: Boolean }) public collapsible: boolean = false;
  @property({ type: Boolean, reflect: true }) public collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) public shadow: boolean = true;

  public firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    this.addListeners();
  }

  public toggle() {
    this.collapsed = !this.collapsed;
  }

  public addListeners() {
    if (this.collapsible) {
      const title = this.shadowRoot.querySelector("#title");
      if (title) title.addEventListener("click", () => this.toggle());
    }
  }

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }
}

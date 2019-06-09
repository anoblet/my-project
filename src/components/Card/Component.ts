import { LitElement, customElement, property, query } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("card-component")
export class CardComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) public collapsed: boolean = false;
  @property({ type: Boolean }) public collapsible: boolean = false;
  @query("#title") public _title: Element;

  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  public firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    this.addListeners();
  }

  protected addListeners() {
    if (this.collapsible)
      this._title.addEventListener("click", () => this.toggle());
  }

  public toggle() {
    this.collapsed = !this.collapsed;
  }
}

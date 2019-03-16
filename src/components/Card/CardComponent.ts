import { LitElement, customElement, property, query } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("card-component")
export class CardComponent extends LitElement {
  @property({ type: Boolean }) public collapsible: boolean = false;
  @property({ type: Boolean, reflect: true }) public collapsed: boolean = false;

  @query("#title") _title: Element;

  public firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    this.addListeners();
  }

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  public addListeners() {
    this._title.addEventListener("click", () => this.toggle());
  }

  public toggle() {
    this.collapsed = !this.collapsed;
  }
}

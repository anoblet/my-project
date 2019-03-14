import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("contact-component")
export class Contact extends LitElement {
  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  public in() {}

  public out() {}
}

import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("admin-component")
export class AdminComponent extends LitElement {
  static styles = [GlobalStyle, Style];
  public render() {
    return Template.bind(this)();
  }
}

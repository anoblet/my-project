import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import template from "./DrawerTemplate";

@customElement("drawer-component")
export class Drawer extends LitElement {
  mediaSize = false;
  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}

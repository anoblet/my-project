import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("footer-component")
export class Footer extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render() {
    return Template.bind(this)();
  }
}

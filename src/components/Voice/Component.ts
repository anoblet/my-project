import { LitElement, customElement, property, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("voice-component")
export class Voice extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }
}

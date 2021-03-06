import { LitElement, customElement } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("admin-component")
export class AdminComponent extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);
}

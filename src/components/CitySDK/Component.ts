import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

@customElement("clock-component")
export class Clock extends LitElement {
  @property() public time: any;

  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }
}

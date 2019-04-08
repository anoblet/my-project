import { LitElement, customElement, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("clock-component")
export class Clock extends LitElement {
  public static styles = [Style];

  public render() {
    return Template.bind(this)();
  }
}

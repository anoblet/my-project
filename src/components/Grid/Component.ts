import { LitElement, customElement } from "lit-element";

import Template from "./Template";
import Style from "./Style";

@customElement("grid-component")
export class GridComponent extends LitElement {
  static get styles() {
    return Style;
  }
  public render() {
    return Template.bind(this)();
  }
}

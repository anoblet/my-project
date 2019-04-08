import { LitElement, customElement } from "lit-element";

import Template from "./Template";
import Style from "./Style";

@customElement("grid-component")
export class GridComponent extends LitElement {
  public static styles = [Style];

  public render() {
    return Template.bind(this)();
  }
}

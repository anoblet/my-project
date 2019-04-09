import { LitElement, customElement, property } from "lit-element";

import Template from "./Template";
import Style from "./Style";

@customElement("grid-component")
export class GridComponent extends LitElement {
  @property() public columns: string;
  public static styles = [Style];

  public render() {
    return Template.bind(this)();
  }

  public firstUpdated() {
    if (this.columns)
      this.style.setProperty(
        "grid-template-columns",
        `repeat(${this.columns}, 1fr)`
      );
  }
}

import { LitElement, customElement, html, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property() public label: string;
  @property() public theme: string = "native";

  static get styles() {
    return [Style];
  }
  public render() {
    return Template.bind(this)();
  }
}

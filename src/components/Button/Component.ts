import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property() public theme: string = "native";
  static properties = Properties;
  static styles = Style;

  public constructor() {
    super();
    this.theme = "native";
  }

  public render() {
    return Template.bind(this)();
  }
}

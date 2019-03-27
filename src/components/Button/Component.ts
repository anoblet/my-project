import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property({ type: String }) theme = "native";

  static properties = Properties;
  static styles = Style;

  public get properties() {
    return {
      theme: { type: String }
    };
  }

  public render() {
    return Template.bind(this)();
  }
}

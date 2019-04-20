import { LitElement, customElement, property } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property({ type: String }) public theme = "native";

  public static properties = Properties;
  public static styles = Style;
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }
}

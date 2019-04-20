import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }
}

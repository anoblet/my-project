import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("text-field")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);
}

import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";

@customElement("layout-component")
export class LayoutComponent extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);
}

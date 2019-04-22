import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";

@customElement("ratio-component")
export class RatioComponent extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);
}

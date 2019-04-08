import { LitElement, customElement, property } from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("playground-component")
export class Playground extends LitElement {
  @property() public template: any = Template;

  public static styles = [Style];

  public render() {
    return this.template.bind(this)();
  }
}

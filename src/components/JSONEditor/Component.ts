import { LitElement, customElement } from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("json-editor")
export class JSONEditor extends LitElement {

  public static styles = [Style];
  public template = Template;

  public render() {
    return this.template.bind(this)();
  }
}

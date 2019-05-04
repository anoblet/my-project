import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";

@customElement("census-explorer")
export class Component extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);
}

const array = ["pep", "agesex"] === ["pep", "agesex"];

console.log(array);

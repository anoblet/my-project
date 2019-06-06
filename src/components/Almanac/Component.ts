import { LitElement, customElement, property, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("component-almanac")
export class Almanac extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);
}

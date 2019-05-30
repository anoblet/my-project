import { LitElement, customElement, property } from "lit-element";

import Style from "./Style";
import Template from "./Template";

/**
 * Tabs
 */
@customElement("component-tabs")
export class Tabs extends LitElement {
  public static styles = [Style];
  public render = Template.bind(this);
}

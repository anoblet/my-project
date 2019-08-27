import { LitElement, customElement, property } from "lit-element";

import Style from "./Style";
import Template from "./Template";

/**
 * Icon
 */
@customElement("component-icon")
export class Component extends LitElement {
  public static styles = [Style];
  public render = Template.bind(this);

  @property({ type: String }) public icon: string = "home";
}

import { LitElement, customElement } from "lit-element";

import globalStyle from "../../GlobalStyle";
import { style } from "./UserComponentStyle";
import { template } from "./UserComponentTemplate";

@customElement("user-component")
export class UserComponent extends LitElement {
  static get styles() {
    return [globalStyle, style];
  }

  render() {
    return template.bind(this)();
  }
}

import { css, property, LitElement } from "lit-element";
import { template } from "./UserComponentTemplate";
import { style } from "./UserComponentStyle";

import globalStyle from "../../GlobalStyle";

export class UserComponent extends LitElement {
  static get styles() {
    return [
      globalStyle,
      style
    ];
  }

  render() {
    return template.bind(this)();
  }
}

window.customElements.define("user-component", UserComponent);

import { LitElement, customElement, css } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import template from "./AdminTemplate";

@customElement("admin-component")
export class AdminComponent extends LitElement {
  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          flex: 1;
        }
      `
    ];
  }

  public render() {
    return template.bind(this)();
  }
}

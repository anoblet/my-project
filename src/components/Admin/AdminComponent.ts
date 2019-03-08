import { LitElement, customElement, css } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Template from "./AdminTemplate";

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
    return Template.bind(this)();
  }
}

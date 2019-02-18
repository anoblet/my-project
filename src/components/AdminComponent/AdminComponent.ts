import { LitElement, customElement, css } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import template from "./AdminTemplate";

import(/* webpackChunkName: "CardComponent" */ "../CardComponent/CardComponent");
import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");

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

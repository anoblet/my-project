import { css, LitElement } from "lit-element";
import template from "./PageHomeTemplate";

import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");

export class PageHome extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex: 1;
          height: min-content;
        }

        #content-grid {
          flex: 1;
          height: min-content;
        }
      `
    ];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("page-home", PageHome);

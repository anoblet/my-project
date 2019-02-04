import { css, html, property, LitElement } from "lit-element";
import template from "./PageHomeTemplate";
import "../BlogComponent/Blog";

import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");
import(/* webpackChunkName: "BlogComponent" */ "../BlogComponent/Blog");

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

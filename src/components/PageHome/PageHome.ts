import { css, html, LitElement } from "lit-element";
import * as style from "./PageHome.scss";
import Template from "./PageHomeTemplate";
import(/* webpackChunkName: "ComponentList" */ "../../components/CollectionList/CollectionList");
import(/* webpackChunkName: "EyeChart" */ "../EyeChart/EyeChartComponent");
import(/* webpackChunkName: "Blog" */ "../BlogComponent/Blog");
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

export class PageHome extends Mixin(connect(store)(LitElement), [StateMixin]) {
  static get styles() {
    return [
      css`
        :host: {
        }
      `
    ];
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${Template.bind(this)(this.state)}
    `;
  }
}

window.customElements.define("page-home", PageHome);

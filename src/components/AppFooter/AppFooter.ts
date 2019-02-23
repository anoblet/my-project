import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

import { LitElement, css } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { Mixin } from "../../../packages/Mixin";
import Style from "./Style";
import Template from "./AppFooterTemplate";
import { TemplateMixin } from "../../../packages/TemplateMixin";

export class AppFooter extends Mixin(LitElement, [TemplateMixin]) {
  public template = Template;
  static get styles() {
    return [GlobalStyle, Style];
  }
}

window.customElements.define("app-footer", AppFooter);

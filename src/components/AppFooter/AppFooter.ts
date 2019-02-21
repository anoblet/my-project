import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

import GlobalStyle from "../../GlobalStyle";
import { LitElement } from "lit-element";
import { Mixin } from "../../../packages/Mixin";
import Template from "./AppFooterTemplate";
import { TemplateMixin } from "../../../packages/TemplateMixin";

export class AppFooter extends Mixin(LitElement, [TemplateMixin]) {
  public template = Template;
  static get styles() {
    return GlobalStyle;
  }
}

window.customElements.define("app-footer", AppFooter);

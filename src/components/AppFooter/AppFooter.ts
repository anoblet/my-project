import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");
import { html, LitElement } from "lit-element";
import { BaseMixin } from "../../../packages/BaseMixin";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import { Mixin } from "../../../packages/Mixin";
import Template from "./AppFooterTemplate";

export class AppFooter extends Mixin(LitElement, [TemplateMixin]) {
  public template = Template;
}

window.customElements.define("app-footer", AppFooter);

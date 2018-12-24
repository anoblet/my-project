import "@material/mwc-fab";
import { html, LitElement } from "@polymer/lit-element";
import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import Template from "./AppFooterTemplate";

export class MenuComponent extends Mixin(LitElement, [BaseMixin]) {
  public render() {
    return Template.bind(this)({});
  }
}

window.customElements.define("menu-component", MenuComponent);

import { LitElement } from "lit-element";
import { Mixin } from "../Mixin";
import { BaseMixin } from "../BaseMixin";

import Template from "./MyLoaderTemplate";

export class MyLoader extends Mixin(LitElement, [BaseMixin]) {
  public render() {
    return Template.bind(this)();
  }
}

window.customElements.define("my-loader", MyLoader);

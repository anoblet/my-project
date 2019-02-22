import { LitElement, property } from "lit-element";
import Template from "./MyFlexTemplate";

export class MyFlex extends LitElement {
  @property({type: String, reflect: true}) public direction: any;

  public render() {
    return Template.bind(this)();
  }
}

window.customElements.define("my-flex", MyFlex);

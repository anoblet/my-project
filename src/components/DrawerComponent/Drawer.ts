import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import template from "./DrawerTemplate";
import { Mixin } from "../../../packages/Mixin"
import { MediaMixin } from "../../../packages/MediaMixin"

// @customElement("drawer-component")
export class Drawer extends Mixin(LitElement, [MediaMixin]) {
  @property({ type: Boolean, reflect: true }) hidden: boolean = true;
  // @property({ type: Boolean, reflect: true }) opened: boolean = true;
  toggle() {
    this.hidden = !this.hidden;
  }

  constructor() {
    super();
    console.log(this.mediaSize);
    if (this.mediaSize === "small") this.hidden = true;
    if (this.mediaSize === "large") this.hidden = false;
  }

  set opened(value: any) {
    this.opened = value;
    this.hidden = !value;
  }

  static get styles() {
    return [GlobalStyle, Style];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("drawer-component", Drawer);

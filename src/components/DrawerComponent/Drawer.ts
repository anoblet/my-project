import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import template from "./DrawerTemplate";
import { Mixin } from "../../../packages/Mixin";
import { MediaMixin } from "../../../packages/MediaMixin";

// @customElement("drawer-component")
export class Drawer extends Mixin(LitElement, [MediaMixin]) {
  @property({ type: Boolean, reflect: true }) public hidden: boolean = true;

  public toggle() {
    this.hidden = !this.hidden;
  }

  constructor() {
    super();
    if (this.mediaSize === "mobile") this.hidden = true;
    if (this.mediaSize === "desktop") this.hidden = false;

    // watchMediaSize((mediaSize: string) => {
    //   if (mediaSize === "mobile") this.hidden = true;
    //   if (mediaSize === "desktop") this.hidden = false;
    // });
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

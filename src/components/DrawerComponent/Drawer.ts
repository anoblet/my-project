import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import template from "./DrawerTemplate";
import { subscribe } from "../../Media";
import { store } from "../../Store";

@customElement("drawer-component")
export class Drawer extends LitElement {
  @property({ type: Boolean, reflect: true }) public hidden: boolean = true;
  @property({ reflect: true, attribute: "media-size" })
  public mediaSize: string = "true";

  public toggle() {
    this.hidden = !this.hidden;
  }

  constructor() {
    super();
    subscribe((mediaSize: string) => {
      if (mediaSize === "mobile") this.hidden = true;
      if (mediaSize === "desktop") this.hidden = false;
      this.mediaSize = mediaSize;
    });
    store.subscribe(() => this.requestUpdate());
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

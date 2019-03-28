import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { media } from "../../Media";
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
    media.subscribe((mediaSize: string) => {
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

  public static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }
}

import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { media } from "../../Media";
import { store } from "../../Store";

import { App } from "../App/Component";

@customElement("drawer-component")
export class Drawer extends LitElement {
  public static styles = [GlobalStyle, Style];
  public template = Template;
  public render = this.template.bind(this)();
  @property({ type: Boolean, reflect: true }) public hidden: boolean = true;
  @property({ reflect: true, attribute: "media-size" })
  public mediaSize: string = "true";

  public toggle() {
    this.hidden = !this.hidden;
  }

  public close() {
    this.hidden = true;
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

  public firstUpdated() {
    const _links = [];
    const links = this.shadowRoot.querySelectorAll("a");
    for (const link of links as any) {
      _links.push(link);
    }
    _links.map((link: HTMLElement) =>
      link.addEventListener("click", () => {
        const el: App = document.querySelector("app-component");
        if (this.mediaSize === "mobile") el._toggleDrawer();
      })
    );
  }
}

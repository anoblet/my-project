import { LitElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import State from "../../State";
import Style from "./Style";
import template from "./ProfileMenuTemplate";

export class ProfileMenu extends LitElement {
  @property({ type: Boolean, reflect: true })
  public hidden: boolean = true;
  public handler: any;

  public static styles = [GlobalStyle, Style];

  public connectedCallback() {
    super.connectedCallback();
    this.handler = (e: any) => {
      return;
    };
  }

  public firstUpdated() {
    // Close ProfileMenu on link click
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) =>
      link.addEventListener("click", this._closeProfileMenu.bind(this))
    );
  }

  public close() {
    this.hidden = true;
  }

  public open() {
    this.hidden = false;
  }

  // Handlers
  public _closeProfileMenu() {
    this.hidden = true;
  }

  public render() {
    return template.bind(this)(State.get());
  }
}

window.customElements.define("profile-menu", ProfileMenu);

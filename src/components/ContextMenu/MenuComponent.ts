// import * as style from "./MenuComponent.scss";

import { LitElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import { store } from "../../Store";
import template from "./MenuTemplate";

export class MenuComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) public hidden = true;
  public boundListener: any;

  public static styles = [Style];

  constructor() {
    super();
    store.subscribe(() => {
      const state = store.getState();
      if (state.settings) {
        if (state.settings.rightClick) {
          document.addEventListener("contextmenu", this.boundListener);
        } else {
          document.removeEventListener("contextmenu", this.boundListener);
        }
      }
    });
    document.addEventListener("keyup", this._onKeyUp.bind(this));
  }

  public firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) => {
      link.addEventListener("click", () => {
        this.hidden = true;
      });
    });
  }

  public _onContextMenu(e: any) {
    e.preventDefault();
    this.hidden = !this.hidden;
  }

  public _onKeyUp(e: any) {
    if (e.shiftKey && e.keyCode === 32) {
      this.hidden = !this.hidden;
    }
  }

  public render() {
    return template();
  }
}

window.customElements.define("menu-component", MenuComponent);

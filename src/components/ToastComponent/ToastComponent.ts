import { css, property, LitElement } from "lit-element";
import { template } from "./ToastTemplate";

import globalStyle from "../../GlobalStyle";

export class ToastComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) hidden: boolean = true;
  @property() message: string;
  toastFire: any;

  constructor() {
    super();
    this.toastFire = (e: any) => this.fire(e.detail);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("toast-fire", this.toastFire);
  }

  fire(message: string) {
    this.message = message;
    this.hidden = false;
    setTimeout(() => (this.hidden = true), 4000);
  }

  static get styles() {
    return [
      globalStyle,
      css`
        :host {
          position: fixed;
          top: 25%;
          left: 25%;
          right: 25%;
          bottom: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--background-color);
          border: 1px solid var(--border-color);
        }
      `
    ];
  }

  render() {
    return template.bind(this)();
  }
}

window.customElements.define("toast-component", ToastComponent);

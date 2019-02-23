import { css, property, LitElement } from "lit-element";
import { template } from "./ToastTemplate";

import globalStyle from "../../GlobalStyle";

export class ToastComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) public hidden: boolean = true;
  @property() public message: string;
  public toastFire: any;

  constructor() {
    super();
    this.toastFire = (e: any) => this.fire(e.detail);
  }

  public connectedCallback() {
    super.connectedCallback();
    document.addEventListener("toast-fire", this.toastFire);
  }

  public fire(message: string) {
    this.message = message;
    this.hidden = false;
    setTimeout(() => (this.hidden = true), 3000);
  }

  static get styles() {
    return [
      globalStyle,
      css`
        :host {
          position: fixed;
          left: 33%;
          right: 33%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--background-color);
          border: 1px solid var(--border-color);
          border-color: var(--border-color);
          border-radius: var(--border-radius);
        }
      `
    ];
  }

  public render() {
    return template.bind(this)();
  }
}

window.customElements.define("toast-component", ToastComponent);

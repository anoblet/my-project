import { LitElement, css, customElement, html, property } from "lit-element";

@customElement("toast-component")
export class ToastComponent extends LitElement {
  @property() public content: string;

  public static get styles() {
    return css`
      :host {
        position: absolute;
        background: var(--background-color);
        text-align: center;
        color: var(--text-color);
        border: 1px solid var(--border-color);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        border-top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        min-width: 50%;
        padding: 0 1em 1em 1em;
        top: 0;
      }
    `;
  }
  public render() {
    return html`
      ${this.content}
    `;
  }
}

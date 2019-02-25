import { LitElement, css, html, property } from "lit-element";

class ToastComponent extends LitElement {
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
      }
    `;
  }
  public render() {
    return html`
      ${this.content}
    `;
  }
}
window.customElements.define("toast-component2", ToastComponent);

/**
 * Fire a toast
 * @param  message [description]
 * @return         [description]
 *
 * @todo Separate the helper from the ui
 */
export const toast = (message: string) => {
  const element: any = document.createElement("toast-component2");
  element.content = message;
  const container = document
    .querySelector("app-component")
    .shadowRoot.querySelector("#content");
  container.appendChild(element);
  setTimeout(() => element.parentNode.removeChild(element), 2500);
};

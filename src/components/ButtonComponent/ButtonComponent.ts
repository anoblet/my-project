import { css, html, LitElement, customElement, property } from "lit-element";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property() label: string;

  static get styles() {
    return [
      css`
        button {
          display: flex;
          flex-grow: 1;
          justify-content: center;
          background: inherit;
          border: 1px solid var(--button-color);
          padding: var(--padding);
          color: var(--button-color);
        }
      `
    ];
  }

  render() {
    return html`
      <button>${this.label}</button>
    `;
  }
}

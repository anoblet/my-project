import { css, html, LitElement, property } from "lit-element";
import { getLog } from "../../Log";

export class Log extends LitElement {
  render() {
    return html`
      ${getLog()}
    `;
  }
}

window.customElements.define("log-component", Log);

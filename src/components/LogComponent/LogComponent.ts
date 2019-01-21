import { css, html, LitElement, property } from "lit-element";
import { getLog } from "../../Debug";

export class Log extends LitElement {
  render() {
    return html`
      <ul>
        ${
          getLog().map(
            (message: string) =>
              html`
                <li>${message}</li>
              `
          )
        }
      </ul>
    `;
  }
}

window.customElements.define("log-component", Log);

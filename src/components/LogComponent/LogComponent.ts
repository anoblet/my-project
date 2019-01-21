import { css, html, LitElement, property } from "lit-element";
import { getLog } from "../../Debug";

export class Log extends LitElement {
  getHistory() {
    return getLog();
  }
  render() {
    return html`
      <ul>
        ${
          this.getHistory().map(
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

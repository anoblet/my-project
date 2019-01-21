import { css, html, LitElement, property } from "lit-element";
import { getLog } from "../../Debug";

export class Log extends LitElement {
  getHistory() {
    return getLog();
  }
  render() {
    const history = getLog();
    return html`
      <ul>
        ${
          this.getHistory().map(
            (item: any, index: number) =>
              html`
                ${
                  !index
                    ? html`
                        <li>...${Math.round(item.time)}ms</li>
                        <li>${item.message}</li>
                      `
                    : html`
                        <li>
                          ${item.message}
                          (+${
                            Math.round(item.time - history[index - 1].time)
                          }ms)
                        </li>
                      `
                }
              `
          )
        }
      </ul>
    `;
  }
}

window.customElements.define("log-component", Log);

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
                <li>
                  ${item.message}
                  (${
                    Math.round(
                      index ? item.time - history[index - 1].time : item.time
                    )
                  }ms)
                </li>
              `
          )
        }
      </ul>
    `;
  }
}

window.customElements.define("log-component", Log);

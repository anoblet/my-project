import "./Component";

import { LitElement, css, customElement, html, property } from "lit-element";

@customElement("ratio-demo")
export class Demo extends LitElement {
  @property() public ratio = 0.1;
  public static styles = [
    css`
      :host {
        flex: 1;
      }

      ratio-component {
        padding: 1em;
        border: 1px solid var(--border-color);
      }

      input {
        border: 0;
        border-bottom: 1px solid var(--border-color);
      }
    `
  ];

  public render() {
    return html`
      <grid-component>
        <div>
          Ratio:
          <input
            name="ratio"
            type="number"
            step="0.1"
            value="0.1"
            @input=${this.handleChange}
          />
        </div>
        <ratio-component .ratio=${this.ratio}>test</ratio-component>
      </grid-component>
    `;
  }

  public handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }
}

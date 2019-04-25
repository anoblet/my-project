import "./Component";

import { LitElement, css, customElement, html, property } from "lit-element";

@customElement("ratio-demo")
export class Demo extends LitElement {
  public static styles = [css``];

  public render() {
    return html`
      <grid-component>
        <div>
          Ratio:
          <input
            name="ratio"
            type="text"
            value="1"
            @input=${this.handleChange}
          />
        </div>
        <ratio-component ratio=${this.ratio}>test</ratio-component>
      </grid-component>
    `;
  }

  @property() public ratio = 1;

  public handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }
}

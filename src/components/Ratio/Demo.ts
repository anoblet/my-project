import "./Component";

import { LitElement, css, customElement, html, property } from "lit-element";

@customElement("ratio-demo")
export class Demo extends LitElement {
  public static styles = [css``];

  public render() {
    return html`
      <input name="ratio" type="text" @input=${this.handleChange} />
      <ratio-component ratio=${this.ratio}>test</ratio-component>
    `;
  }

  @property() public ratio = 1;

  public handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }
}

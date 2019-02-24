import { LitElement, property } from "lit-element";
import { BaseMixin } from "../BaseMixin";

// import './src/components/MyRow/MyRow'
// import './src/components/MyColumn/MyColumn'

import Template from "./View/MyGrid";

export class MyGrid extends BaseMixin(LitElement) {
  @property({ type: String }) public direction = "row";
  @property({ type: Number }) public columns: number;

  public connectedCallback() {
    super.connectedCallback();
    if (this.columns)
      this.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
  }

  public render() {
    return Template.bind(this)();
  }
}

window.customElements.define("my-grid", MyGrid);

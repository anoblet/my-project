import { LitElement, property } from "@polymer/lit-element";
import { BaseMixin } from "@anoblet/base-mixin";

// import './src/components/MyRow/MyRow'
// import './src/components/MyColumn/MyColumn'

import Template from "./View/MyGrid";

export class MyGrid extends BaseMixin(LitElement) {
  @property({ type: String }) direction = "row";
  @property({ type: Number }) columns: number;

  connectedCallback() {
    super.connectedCallback();
    if (this.columns)
      this.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define("my-grid", MyGrid);

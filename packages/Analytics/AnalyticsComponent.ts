import { LitElement, property } from "lit-element";

export class AnalyticsComponent extends LitElement {
  @property({ type: String }) account: string;
  constructor() {
    super();
    // document.getElementsByTagName("head")[0].appendChild(whatever);
  }
}

window.customElements.define("analytics-component", AnalyticsComponent);

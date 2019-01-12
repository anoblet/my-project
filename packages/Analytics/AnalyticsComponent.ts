import { LitElement, property } from "lit-element";

export class AnalyticsComponent {
  @property({ type: String }) account: string;
  constructor() {
    // document.getElementsByTagName("head")[0].appendChild(whatever);
  }
}

window.customElements.define("analytics-component", AnalyticsComponent);

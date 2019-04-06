import { html } from "lit-element";
import { until } from "lit-html/directives/until";

export default function() {
  return html`
    <button-component @click=${this.getLocation}>Get location</button-component>
    ${this.location
      ? html`
          <grid-component style="grid-template-columns: repeat(2, 1fr)">
            <div>Latitude:</div>
            <div>${this.latitude}</div>
            <div>Longitude:</div>
            <div>${this.longitude}</div>
          </grid-component>
        `
      : html``}
  `;
}

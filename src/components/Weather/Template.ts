import { html } from "lit-element";
import { until } from "lit-html/directives/until";

export default function() {
  return html`
    <button @click=${this.getLocation}>Refresh location</button>
    ${this.location
      ? html`
          <grid-component style="grid-template-columns: repeat(2, 1fr)">
            <div>Latitude:</div>
            <div>${this.location.latitude}</div>
            <div>Longitude:</div>
            <div>${this.location.longitude}</div>
            <div>Temperature:</div>
            <div>
              ${until(
                this.getTemperature().then(
                  (result: any) =>
                    html`
                      ${result.temperature} ${result.unit}
                    `
                ),
                html``
              )}
            </div>
          </grid-component>
        `
      : html``}
  `;
}

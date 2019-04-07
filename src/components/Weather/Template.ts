import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPositionTemplate } from "../Location/Lib";

export default function() {
  return html`
    <grid-component>
      ${getPositionTemplate(this.positionChanged.bind(this))}
      ${this.latitude && this.longitude
        ? html`
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
              <div>Latitude:</div>
              <div>
                ${this.latitude}
              </div>
              <div>Longitude:</div>
              <div>
                ${this.longitude}
              </div>
            </grid-component>
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
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
            ${until(
              this.getPeriod(0).then(
                (result: any) =>
                  html`
                    <grid-component
                      style="grid-template-columns: repeat(2, 1fr)"
                    >
                      <div>Wind direction:</div>
                      <div>${result.windDirection}</div>
                      <div>Wind speed:</div>
                      <div>${result.windSpeed}</div>
                    </grid-component>
                  `
              )
            )}
          `
        : html``}
    </grid-component>
  `;
}

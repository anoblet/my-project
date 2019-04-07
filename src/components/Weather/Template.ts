import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPositionTemplate } from "../Location/Lib";

export default function() {
  return html`
    <grid-component>
      ${getPositionTemplate(({ latitude, longitude }) => {
        this.latitude = latitude;
        this.longitude = longitude;
      })}
      ${this.latitude && this.longitude
        ? html`
            <grid-component style="grid-template-columns: repeat(2, 1fr)">
              <div>Latitude:</div>
              <div>
                <input
                  type="text"
                  value=${this.latitude}
                  @change=${this.latitudeChanged}
                />
              </div>
              <div>Longitude:</div>
              <div>
                <input
                  type="text"
                  value=${this.longitude}
                  @change=${this.longitudeChanged}
                />
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
              this.getPeriod(0).then((result: any) => JSON.stringify(result))
            )}
          `
        : html``}
    </grid-component>
  `;
}

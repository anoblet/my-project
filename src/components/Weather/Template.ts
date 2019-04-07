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
            ${until(
              this.getPeriod(0).then(
                (period: any) =>
                  html`
                    <grid-component
                      style="grid-template-columns: repeat(2, 1fr)"
                    >
                      <div>Temperature:</div>
                      <div>${period.temperature} ${period.temperatureUnit}</div>
                      <div>Icon:</div>
                      <div><img src=${period.icon} /></div>
                      <div>Wind direction:</div>
                      <div>${period.windDirection}</div>
                      <div>Wind speed:</div>
                      <div>${period.windSpeed}</div>
                      <div>Short forecast:</div>
                      <div>${period.shortForecast}</div>
                      <div>Detailed forecast:</div>
                      <div>${period.detailedForecast}</div>
                    </grid-component>
                  `
              )
            )}
          `
        : html``}
    </grid-component>
  `;
}

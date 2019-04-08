import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPeriod } from "./Component";

export const currentTemperature = (coordinates: any) => {
  return html`
    <card-component style="display: flex; flex: 1;">
      <div slot="title">Temperature</div>
      <div
        slot="content"
        style="display: flex; align-items: center; justify-content: center;"
      >
        ${until(
          getPeriod(coordinates, 0).then(
            (period: any) =>
              html`
                ${period.temperature}&#176; ${period.temperatureUnit}
              `
          )
        )}
      </div>
    </card-component>
  `;
};

export const shortForecast = (coordinates: any) => {
  return html`
    <card-component style="display: flex; flex: 1;">
      <div slot="title">Short forecast</div>
      <div
        slot="content"
        style="display: flex; align-items: center; justify-content: center;"
      >
        ${until(
          getPeriod(coordinates, 0).then(
            (period: any) =>
              html`
                ${period.shortForecast}
              `
          )
        )}
      </div>
    </card-component>
  `;
};

export const detailedForecast = (coordinates: any) => {
  return html`
    <card-component style="display: flex; flex: 1;">
      <div slot="title">Detailed forecast</div>
      <div
        slot="content"
        style="display: flex; align-items: center; justify-content: center;"
      >
        ${until(
          getPeriod(coordinates, 0).then(
            (period: any) =>
              html`
                ${period.detailedForecast}
              `
          )
        )}
      </div>
    </card-component>
  `;
};

export const windDirection = (coordinates: any) => {
  return html`
    <card-component style="display: flex; flex: 1;">
      <div slot="title">Wind direction</div>
      <div
        slot="content"
        style="display: flex; align-items: center; justify-content: center;"
      >
        ${until(
          getPeriod(coordinates, 0).then(
            (period: any) =>
              html`
                ${period.windDirection}
              `
          )
        )}
      </div>
    </card-component>
  `;
};

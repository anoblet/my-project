import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPeriod } from "./Component";

export const currentTemperature = (coordinates: any) => {
  return html`
    <card-component style="display: block;">
      <div slot="content">
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

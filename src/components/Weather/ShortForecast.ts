import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPeriod } from "./Component";

export const currentTemperature = (coordinates: any) => {
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

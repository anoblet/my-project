import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPeriod } from "./Component";

export const currentTemperature = (coordinates: any) => {
  return html`
    ${until(
      getPeriod(coordinates, 0).then(
        (period: any) =>
          html`
            ${period.temperature}
          `
      )
    )}
  `;
};

import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPeriod } from "./Component";
import { periodTemplate } from "./PeriodTemplate";

export const currentTemperature = (coordinates: any) => {
  return html`
    ${until(getPeriod(coordinates, 0).then(periodTemplate))}
  `;
};

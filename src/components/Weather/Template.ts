import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPositionTemplate } from "../Location/Lib";
import { periodTemplate } from "./PeriodTemplate";
import { getPeriod } from "./Component";

export default function() {
  const coordinates = {
    latitude: this.latitude,
    longitude: this.longitude
  };
  return html`
    <grid-component>
      ${getPositionTemplate(this.positionChanged.bind(this))}
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
      ${this.latitude && this.longitude
        ? html`
            ${until(getPeriod(coordinates, 0).then(periodTemplate))}
          `
        : html``}
    </grid-component>
  `;
}

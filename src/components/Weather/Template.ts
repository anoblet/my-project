import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { getPositionTemplate } from "../Location/Lib";
import { periodTemplate } from "./PeriodTemplate";

export default function() {
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
            ${until(this.getPeriod(0).then(periodTemplate))}
          `
        : html``}
    </grid-component>
  `;
}

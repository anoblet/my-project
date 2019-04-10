import { html } from "lit-element";
import { renderForm } from "../Form/Form";

export default function() {
  return html`
    ${renderForm({ structure: this.constructor.properties, values: this })}
    <div id="chart"></div>
  `;
}

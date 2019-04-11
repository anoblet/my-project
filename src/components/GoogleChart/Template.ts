import { html } from "lit-element";
import { renderForm } from "../Form/Form";

export default function() {
  return html`
    ${false
      ? renderForm({ structure: this.constructor.properties, values: this })
      : undefined}
    <div class="absolute"><div id="chart"></div></div>
  `;
}

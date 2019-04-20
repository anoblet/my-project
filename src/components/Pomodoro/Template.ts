import { html } from "lit-element";

export default function() {
  return html`
    <grid-component>
      <div>
        <grid-component id="input" columns="2">
          <input name="minutes" type="text" value="20" />
          <input name="seconds" type="text" value="00" />
        </grid-component>
      </div>
      <div>
        <button-component>Start</button-component>
      </div>
    </grid-component>
  `;
}

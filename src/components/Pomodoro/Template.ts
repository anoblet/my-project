import { html } from "lit-element";

export default function() {
  return html`
    <grid-component>
      <grid-component columns="2">
        <input name="minutes" type="text" value="20" />
        <input name="seconds" type="text" value="00" />
      </grid-component>
      <div id="input">
        <button-component>Start</button-component>
      </div>
    </grid-component>
  `;
}

import { html } from "lit-element";

export default function() {
  return html`
    <div id="input">
      <input name="minutes" type="text" value="20" />
      <input name="seconds" type="text" value="00" />
    </div>
    <button-component>Start</button-component>
  `;
}

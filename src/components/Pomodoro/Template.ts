import { html } from "lit-element";

export default function() {
  return html`
    <div id="input">
      <grid-component columns="2">
        <input name="minutes" type="text" value=${this.getMinutes()} />
        <input name="seconds" type="text" value="00" />
      </grid-component>
    </div>
    <div>
      <button-component>Start</button-component>
    </div>
  `;
}

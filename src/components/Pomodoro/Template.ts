import { html } from "lit-element";

export default function() {
  return html`
    <div id="input">
      <grid-component columns="2">
        <input name="minutes" type="text" value=${this.getMinutes()} />
        <input name="seconds" type="text" value=${this.getMinutes()} />
      </grid-component>
    </div>
    <div>
      <button-component @click=${this.start}>Start</button-component>
    </div>
    ${this.timeleft}
  `;
}

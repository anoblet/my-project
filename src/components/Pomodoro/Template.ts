import { html } from "lit-element";

export default function() {
  return html`
    <div id="input">
      <grid-component columns="2">
        <input name="minutes" type="text" value=${this._minutes} />
        <input name="seconds" type="text" value=${this._seconds} />
      </grid-component>
    </div>
    <div>
      <button-component @click=${this._interval ? this.stop : this.start}
        >Start</button-component
      >
      <button-component @click=${this.reset}
        >Reset</button-component
      >
    </div>
    ${this.timeleft}
  `;
}

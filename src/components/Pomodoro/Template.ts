import { html } from "lit-element";

export default function() {
  return html`
    ${steps.bind(this)()}
    <div id="input">
      <grid-component columns="2">
        <input name="minutes" type="text" value=${this._minutes} />
        <input name="seconds" type="text" value=${this._seconds} />
      </grid-component>
    </div>
    <div>
      <grid-component columns="2">
        <button-component @click=${this._interval ? this.stop : this.start}
          >Start</button-component
        >
        <button-component @click=${this.reset}>Reset</button-component>
      </grid-component>
    </div>
  `;
}

const steps = function() {
  return html`
    ${this.steps.map(
      (step: any, index: number) =>
        html`
          ${step.label}
        `
    )}
  `;
};

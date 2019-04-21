import { html } from "lit-element";

export default function() {
  return html`
    <div>
      ${steps.bind(this)()}
    </div>
    <div id="input">
      <grid-component columns="2">
        <input name="minutes" type="text" value=${this._minutes} />
        <input name="seconds" type="text" value=${this._seconds} />
      </grid-component>
    </div>
    <div flex-grow>
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
    <grid-component columns="8">
      ${this.steps.map(
        (step: any, index: number) =>
          html`
            <span class=${index === this._currentStep ? "active" : ""}
              @click=${this.selectStep(index)}>${step.label}</span
            >
          `
      )}
    </grid-component>
  `;
};

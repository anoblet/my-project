import { html } from "lit-element";

export default function() {
  return html`
    <div id="modes">
      ${modes.bind(this)()}
    </div>
    <div flex-grow>
      <grid-component columns="2">
        <span
          ><input name="minutes" type="text" value="${this._minutes}"
        /></span>
        <span
          ><input name="seconds" type="text" value="${this._seconds}"
        /></span>
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
            <span
              class=${index === this._currentStep ? "active" : ""}
              @click=${() => this.selectStep(index)}
              >${step.label}</span
            >
          `
      )}
    </grid-component>
  `;
};

const modes = function() {
  return html`
    <grid-component columns="2">
      <span @click=${() => this.setMode("focus")}>Focus</span>
      <span @click=${() => this.selectStep("break")}>Break</span>
    </grid-component>
  `;
};

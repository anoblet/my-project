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
  console.log(this);
  return html`
    <grid-component columns="2">
      <button-component
        ?active=${this._currentMode === "focus"}
        @click=${() => this.selectMode("focus")}
        >Focus</button-component
      >
      <button-component
        ?active=${this._currentMode === "break"}
        @click=${() => this.selectMode("break")}
        >Break</button-component
      >
    </grid-component>
  `;
};

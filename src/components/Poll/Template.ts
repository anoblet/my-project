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
      <grid-component>
        <button-component @click=${this._interval ? this.stop : this.start}
          >${this._interval
            ? html`
                Pause
              `
            : html`
                Start
              `}</button-component
        >
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
      <button-component
        ?active=${this._currentMode === 0}
        @click=${() => this.selectMode(0)}
        >Focus</button-component
      >
      <button-component
        ?active=${this._currentMode === 1}
        @click=${() => this.selectMode(1)}
        >Break</button-component
      >
    </grid-component>
  `;
};

import { html } from "lit-element";

export const renderText = ({name, onChange, value}: any) => {
  return html`
    <input
      name="${name}"
      type="text"
      value=${value}
      @change=${(e: any) => this._data[name] = e.detail.value}
    />
  `;
}

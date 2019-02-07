import { html } from "lit-element";

export const renderNumber = ({ name, onChange, value }: any) => {
  onChange = onChange
    ? onChange
    : (e: any) => (this._data[name] = e.detail.value);
  return html`
    <input name="${name}" type="number" value=${value} @change=${onChange} />
  `;
};

export const renderText = ({ name, onChange, value }: any) => {
  onChange = onChange
    ? onChange
    : (e: any) => (this._data[name] = e.detail.value);
  return html`
    <input name="${name}" type="text" value=${value} @change=${onChange} />
  `;
};

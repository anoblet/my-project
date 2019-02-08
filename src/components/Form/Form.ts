import { html } from "lit-element";

const defaultOnChange = (e: any) => (this._data[name] = e.detail.value);

export const renderNumber = ({
  disabled,
  name,
  onChange,
  value
}: any) => {
  onChange = onChange || defaultOnChange;
  return html`
    <input name="${name}" type="number" value=${value} ?disabled=${disabled} @change=${onChange} />
  `;
};

export const renderText = ({
  disabled,
  name,
  onChange,
  value
}: any) => {
  onChange = onChange || defaultOnChange;
  value = value || "";
  return html`
    <input name="${name}" type="text" value=${value} ?disabled=${disabled} @change=${onChange} />
  `;
};

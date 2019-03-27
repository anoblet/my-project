import { html } from "lit-element";
import { updateDocument } from "../../Firebase";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";

const updateField = (field: string, value: string) => {
  const state = store.getState();
  updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: { [field]: value } }
  })
    .then(() => {
      return;
    })
    .catch(() => {
      toast("Error");
    });
};

const renderField = (field: any, theme: any) => html`
  <label>${field.label}</label>
  ${field.type === "color"
    ? html`
        <input
          name="${field.name}"
          type="color"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
  ${field.type === "size"
    ? html`
        <input
          name="${field.name}"
          type="text"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
  ${field.type === "range"
    ? html`
        <input
          name="${field.name}"
          type="range"
          min="0"
          max="0"
          value="${theme[field.property]}"
          @input="${(e: any) => updateField(field.property, e.target.value)}"
        />
      `
    : ""}
`;

export default ({ fields, theme }: any) =>
  html`
    <grid-component style="grid-template-columns: auto 1fr">
      ${fields.map((field: any) => renderField(field, theme))}
    </grid-component>
  `;

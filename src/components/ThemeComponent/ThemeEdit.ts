import { html } from "lit-element";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { store } from "../../Store";

const updateField = (field: string, value: string) => {
  const state = store.getState();
  updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: { [field]: value } }
  });
};

const renderField = (field: any, theme: any) => html`
  <label>${field.label}</label>
  <input
    name="${field.name}"
    type="color"
    value="${theme[field.property]}"
    @input="${(e: any) => updateField(field.property, e.target.value)}"
  />
`;

export default ({ fields, theme }: any) =>
  html`
    <grid-component style="grid-template-columns: auto 1fr">
      ${fields.map((field: any) => renderField(field, theme))}
    </grid-component>
  `;

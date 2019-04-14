import { html } from "lit-element";
import { renderForm } from "../Form/Form";
import { properties } from "./Properties";

export default function() {
  return html`
    ${renderForm({
      structure: properties,
      values: this,
      onChange: (e: any) => {
        this[e.target.getAttribute("name")] = e.target.value;
      }
    })}
  `;
}

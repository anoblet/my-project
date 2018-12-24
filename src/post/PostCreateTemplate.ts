import { html } from "@polymer/lit-element";
import { render } from "lit-html";
import { Post } from "./PostModel";

const post = new Post();

export default function() {
  return html`
    <form>
      <vaadin-form-layout>
      ${post.fields.map(
        (field: any) =>
          html`
            ${
              field.type == "text"
                ? html`
                    <vaadin-text-field
                      name="${field.name}"
                      label="${field.label}"
                    ></vaadin-text-field>
                  `
                : ""
            }
            ${
              field.type == "textarea"
                ? html`
                    <vaadin-text-area
                      colspan="2"
                      name="${field.name}"
                      label="${field.label}"
                    ></vaadin-text-area>
                  `
                : ""
            }
          `
      )}
      <vaadin-form-layout>
      <button
        @click="${(e: Event) => {
          this.submitForm(e);
        }}"
      >
        Submit
      </button>
    </form>
    <div id="result"></div>
  `;
}

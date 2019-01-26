import { html } from "lit-element";
import { render } from "lit-html";

import { model } from "./PostModel";

export default function() {
  return html`
    <card-component>
      <h3 slot="title">Create Post</h3>
      <div slot="content">
        <form>
          <vaadin-form-layout>
            ${
              model.fields.map(
                (field: any) =>
                  html`
                    ${field.label}:
                    ${
                      field.type == "text"
                        ? html`
                            <input
                              name="${field.name}"
                              label="${field.label}"
                            ></input>
                          `
                        : ""
                    }
                    ${
                      field.type == "textarea"
                        ? html`
                            <textarea
                              colspan="2"
                              name="${field.name}"
                              label="${field.label}"
                            ></textarea>
                          `
                        : ""
                    }
                  `
              )
            }
          </vaadin-form-layout>
          <div style="display: flex; justify-content: flex-end;">
            <mwc-button raised @click="${(e: Event) => this.submitForm(e)}"
              >Submit</mwc-button
            >
          </div>
        </form>
        <div id="result"></div>
      </div>
    </card-component>
  `;
}

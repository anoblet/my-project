import { html } from "@polymer/lit-element";
import { render } from "lit-html";

import { post } from "./PostModel";

export default function() {
  return html`
    <my-card>
      <h3 slot="title">Create Post</h3>
      <div slot="content">
        <form>
          <vaadin-form-layout>
            ${
              post.fields.map(
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
              )
            }
          </vaadin-form-layout>
          <div style="display: flex; justify-content: flex-end;">
            <mwc-button @click="${(e: Event) => this.submitForm(e)}"
              >Submit</mwc-button
            >
          </div>
        </form>
        <div id="result"></div>
      </div>
    </my-card>
  `;
}

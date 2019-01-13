import { html } from "lit-element";
import("../../packages/Quill/QuillComponent");
import("../../packages/Quill/QuillDisplay");

import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function() {
  return html`
    <my-card>
      <h3 slot="title">
        ${
          this.editable
            ? html`
                ${this.text({ field: this.model.title, value: this.title })}
              `
            : html`
                ${this.title}
              `
        }
      </h3>
      <div slot="content">
        ${
          this.editable
            ? html`
                ${this.text({ field: this.model.author, value: this.author })}
              `
            : html`
                ${this.author}
              `
        }
        ${
          this.editable
            ? html`
                ${this.text({ field: this.model.date, value: this.date })}
              `
            : html`
                ${this.date}
              `
        }
        ${
          this.editable
            ? html`
                <quill-component
                  name="content"
                  ?output="${this.editable}"
                  .value="${this.content}"
                ></quill-component>
              `
            : html`
                ${
                  this.content
                    ? html`
                        <quill-display
                          name="content"
                          .value="${this.content}"
                        ></quill-display>
                      `
                    : ""
                }
              `
        }

        <mwc-button
          @click="${
            (e: Event) => {
              if (this.editable) this.submitForm(e);
              else this.editable = !this.editable;
            }
          }"
          >${
            this.editable
              ? html`
                  Save
                `
              : html`
                  Edit
                `
          }</mwc-button
        >
      </div>
    </my-card>
  `;
}

import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import structure from "./PostStructure";

export default function() {
  return html`
    <card-component>
      <h3 slot="title">
        ${
          this.editable
            ? html`
                ${this.text({ field: structure.title, value: this.title })}
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
                ${this.text({ field: structure.author, value: this.author })}
              `
            : html`
                ${this.author}
              `
        }
        ${
          this.editable
            ? html`
                ${this.text({ field: structure.date, value: this.date })}
              `
            : html`
                ${this.date}
              `
        }
        ${
          this.editable
            ? html`
                <pell-component
                  name="content"
                  .input="${this.content}"
                ></pell-component>
              `
            : html`
                ${
                  this.content
                    ? html`
                        ${unsafeHTML(this.content)}
                      `
                    : ""
                }
              `
        }
      </div>
      <div slot="actions">
        <mwc-button
          outlined
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
    </card-component>
  `;
}

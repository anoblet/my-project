import { html } from "lit-element";

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
                ${this.text({ field: this.model.content, value: this.content })}
              `
            : html`
                ${this.content}
              `
        }
        <mwc-button
          @click="${
            (e: Event) => {
              if (this.editable) this.submitForm(e);
              this.editable = !this.editable;
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

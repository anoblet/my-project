import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { structure } from "./PostStructure";

function search(nameKey: string, myArray: any) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
}

export default function() {
  return html`
    <card-component>
      <h3 slot="title">
        ${this.editable
          ? html`
              ${this.text({
                field: search("title", structure),
                value: this.title
              })}
            `
          : html`
              ${this.title}
            `}
      </h3>
      <div slot="content">
        <div>
          ${this.editable
            ? html`
                ${this.text({
                  field: search("author", structure),
                  value: this.author
                })}
              `
            : html`
                ${this.author}
              `}
        </div>
        <div>
          ${this.editable
            ? html`
                ${this.text({
                  field: search("sortOrder", structure),
                  value: this.sortOrder
                })}
              `
            : html`
                ${this.author}
              `}
        </div>
        <div>
          ${this.editable
            ? html`
                ${this.text({
                  field: search("date", structure),
                  value: this.date
                })}
              `
            : html`
                ${this.date}
              `}
        </div>
        <div>
          ${this.editable
            ? html`
                <label>Content</label>
                <pell-component
                  name="content"
                  .input="${this.content}"
                ></pell-component>
              `
            : html`
                ${this.content
                  ? html`
                      ${unsafeHTML(this.content)}
                    `
                  : ""}
              `}
        </div>
      </div>
      <div slot="actions">
        <mwc-button
          outlined
          @click="${(e: Event) => {
            if (this.editable) this.submitForm(e);
            else this.editable = !this.editable;
          }}"
          >${this.editable
            ? html`
                Save
              `
            : html`
                Edit
              `}</mwc-button
        >
      </div>
    </card-component>
  `;
}

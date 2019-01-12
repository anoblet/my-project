import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    ${this.dialogOpened}
    ${
      this.dialogOpened
        ? html`
            <div id="dialog">
              ${
                this.model.map(
                  (field: any) => html`
                    <input
                      name="${field.name}"
                      placeholder="${field.label}"
                      type="text"
                    />
                  `
                )
              } <button @click="${() => this.create()}">Save</button>
            </div>
          `
        : ""
    }
    <div class="actions">
      <button @click="${() => (this.dialogOpened = true)}">Create</button>
    </div>
    <div class="grid">
      <div class="row">
        <div class="column no-grow">#</div>
        ${
          this.model.map(
            (field: any) =>
              html`
                <div class="column">${field.label}</div>
              `
          )
        }
        <div class="column no-grow no-visibility"><button>Delete</button></div>
      </div>
      ${
        this._collection
          ? this._collection.map(
              (document: any, index: number) => html`
                <div class="row">
                  <div class="column no-grow">${index}</div>
                  ${
                    this.model.map(
                      (field: any) => html`
                        <div class="column">
                          ${
                            field.link
                              ? html`
                                  <a href="posts/read/${document.id}"
                                    >${document[field.name]}</a
                                  >
                                `
                              : html`
                                  ${document[field.name]}
                                `
                          }
                        </div>
                      `
                    )
                  }
                  <div class="column no-grow">
                    <button @click="${() => this.delete(index)}">Delete</button>
                  </div>
                </div>
              `
            )
          : ""
      }
    </div>
  `;
}

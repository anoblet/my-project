import { html } from "@polymer/lit-element";
import { render } from "lit-html";

export default function() {
  return html`      <form>
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
              e.preventDefault();
              const data: any = {};
              data.title = this.shadowRoot.querySelector(
                "[name='title']"
              ).value;
              data.author = this.shadowRoot.querySelector(
                "[name='author']"
              ).value;
              data.content = this.shadowRoot.querySelector(
                "[name='content']"
              ).value;
              this.addDocument({ path: "posts", data }).then((result: any) => {
                this.shadowRoot.querySelector(
                  "#result"
                ).innerHTML = `Document created: ${result}. Wait 3 seconds for a redirec to your post.`;
                setTimeout(
                  () => store.dispatch(navigate(`/post/read/${result}`)),
                  3000
                );
              });
            }}"
          >
            Submit
          </button>
        </form>
        <div id="result"></div>`;
}

import { LitElement, css, customElement, html } from "lit-element";

import { Poll } from "./Types";
import { delete_outline } from "../../Icons";

const poll = new Poll();

const Template = function() {
  return html`
    <grid-component>
      <form id="form-create">
        <grid-component>
          <grid-component id="title-container">
            <label for="title">Title</label
            ><input
              id="title"
              type="text"
              name="title"
              .value=${this.title}
              @input=${(e: any) => (this.title = e.target.value)}
            />
          </grid-component>
          <div id="actions">
            <button-component
              label="Add item"
              @click=${this.addItem}
            ></button-component>
            <button-component
              label="Save"
              @click=${this.save}
            ></button-component>
          </div>
          <grid-component id="option-container">
            ${this.items.map(
              (item: any, index: number) =>
                html`
                  <label>#${index}</label>
                  <input
                    type="text"
                    .value=${item}
                    @input=${(e: any) => (this.items[index] = e.target.value)}
                  />
                  <span class="icon" @click=${() => this.removeOption(index)}
                    >${delete_outline}</span
                  >
                `
            )}
          </grid-component>
        </grid-component>
      </form>
      <card-component title="Form data">
        Title: ${JSON.stringify(this.title)} Items:
        ${JSON.stringify(this.items)}
      </card-component>
    </grid-component>
  `;
};

const Style = css``;

@customElement("poll-create")
export class Component extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  public removeOption(index: number) {
    const options = [...poll.options];
    options.splice(index, 1);
    poll.options = [...options];
  }
}

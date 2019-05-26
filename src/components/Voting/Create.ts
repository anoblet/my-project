import { LitElement, css, customElement, html, property } from "lit-element";

import { delete_outline } from "../../Icons";

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
              @click=${this.addOption}
            ></button-component>
            <button-component
              label="Save"
              @click=${this.save}
            ></button-component>
          </div>
          <grid-component id="option-container">
            ${this.options.map(
              (option: any, index: number) =>
                html`
                  <label>#${index}</label>
                  <input
                    type="text"
                    .value=${option}
                    @input=${(e: any) => (this.options[index] = e.target.value)}
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

  @property() public title = "";
  @property() public options = [];

  public addOption() {
    this.options = [...this.options, ""];
  }

  public removeOption(index: number) {
    const options = [...this.options];
    options.splice(index, 1);
    this.options = [...options];
  }
}

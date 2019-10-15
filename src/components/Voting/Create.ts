import { LitElement, css, customElement, html, property } from "lit-element";

import Firebase from "../../Firebase";
import { delete_outline } from "@anoblet/material-icons";

const Template = function() {
  return html`
    <form id="form-create">
      <grid-component>
        <card-component>
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
        </card-component>
        <div id="actions">
          <button-component
            label="Add option"
            @click=${this.addOption}
          ></button-component>
          <button-component label="Save" @click=${this.save}></button-component>
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
  `;
};

const Style = css`
  #actions {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 1em;
    justify-content: flex-end;
  }

  #option-container {
    display: grid;
    grid-template-columns: max-content auto max-content;
    grid-gap: 1em;
  }

  label {
    display: flex;
    align-items: center;
  }

  svg {
    fill: currentColor;
  }

  #title-container {
    grid-template-columns: max-content auto;
  }
`;

@customElement("poll-create")
export class Component extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  @property() public title = "";
  @property() public options = [];

  /**
   * Event handler for save
   *
   * @todo There's no need to reference dom as both title and options are available as properties
   */

  public save() {
    Firebase.add({
      path: "polls",
      data: {
        title: this.title,
        options: this.options,
        result: {
          total: 0
        },
        votedIps: []
      }
    });
    this.title = "";
    this.options = [];
  }

  public addOption() {
    this.options = [...this.options, ""];
  }

  public removeOption(index: number) {
    const options = [...this.options];
    options.splice(index, 1);
    this.options = [...options];
  }
}

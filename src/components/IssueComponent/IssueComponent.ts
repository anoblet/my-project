import { LitElement, customElement, html, property } from "lit-element";
import { createIssue } from "../Github/CreateIssue";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import styles from "./Styles";
import { toast } from "../ToastComponent/Toast";

// Should this be a view only component or get it's own data?
@customElement("issue-component")
export class IssueComponent extends LitElement {
  @property({ type: Object }) public _data: any = {};

  // What if saveForm didn't rely on this but took an argument?
  public saveForm() {
    createIssue({ data: this._data })
      .then(() => toast("Issue created"))
      .catch((response: any) => toast(`Could not create issue: ${response}`));
  }

  static get properties() {
    return {
      title: {
        inputType: "text",
        label: "Title",
        placeholder: "Enter a title",
        field: {
          type: "text",
          label: "Title",
          placeholder: "Enter a title"
        },
        type: String
      },
      body: {
        inputType: "textarea",
        label: "Body",
        type: String
      }
    };
  }

  static get styles() {
    return styles;
  }

  public render() {
    return html`
      <card-component title="Create an issue">
        <div slot="content">
          <grid-component>
            <card-component id="form">
              ${renderForm(
                this,
                null,
                (property: string, value: any) =>
                  (this._data = { ...this._data, ...{ [property]: value } })
              )}
            </card-component>
            <card-component>
              ${JSON.stringify(this._data)}
            </card-component>
          </grid-component>
        </div>
        <div slot="actions">
          <button @click=${() => this.saveForm()}>Create</button>
        </div>
      </card-component>
    `;
  }
}

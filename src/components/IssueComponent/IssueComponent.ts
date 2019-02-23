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
      <card-component title="Create a Github issue">
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
            ${false
              ? html`
                  <card-component title="Data">
                    <div slot="content">
                      ${JSON.stringify(this._data)}
                    </div>
                  </card-component>
                `
              : ""}
          </grid-component>
        </div>
        <div slot="actions">
          <mwc-button @click=${() => this.saveForm()}>Create</mwc-button>
        </div>
      </card-component>
    `;
  }
}

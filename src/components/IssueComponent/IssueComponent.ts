import { LitElement, css, html, property } from "lit-element";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { toast } from "../ToastComponent/Toast";
import { issue } from "../Github/Issue";
import { createIssue } from "../Github/CreateIssue";
import globalStyle from "../../GlobalStyle";

// Should this be a view only component or get it's own data?
export class IssueComponent extends LitElement {
  @property({ type: Object }) _data: any;

  // What if saveForm didn't rely on this but took an argument?
  saveForm() {
    createIssue({ data: this._data })
      .then((response: any) => toast("Issue created"))
      .catch((response: any) => toast(`Could not create issue: ${response}`));
  }

  constructor() {
    super();
    this._data = {};
  }

  static get properties() {
    return {
      _data: {
        type: Object
      },
      title: {
        inputType: "text",
        label: "Title",
        placeholder: "Enter your title",
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
    return [
      globalStyle,
      css`
        #form grid-component {
          grid-template-columns: 1fr !important;
        }
      `
    ];
  }

  render() {
    return html`
      <card-component title="Create an issue">
        <div slot="content">
          <grid-component>
            <card-component id="form">
              ${renderForm(this, null, (property: string, value: any) => {
                this._data = { ...this._data, ...{ [property]: value } };
              })}
            </card-component>
            <card-component>
              ${JSON.stringify(this._data)}
            </card-component>
          </grid-component>
        </div>
        <div slot="actions">
          <button @click=${() => this.saveForm()}>Test</button>
        </div>
      </card-component>
    `;
  }
}

window.customElements.define("issue-component", IssueComponent);

import { LitElement, html } from "lit-element";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { config } from "../../../config";
import { toast } from "../ToastComponent/Toast";

const issue = {
  title: "",
  comment: ""
};

export interface IssueComponent {
  [key: string]: any; // Add index signature
}

// Should this be a view only component or get it's own data?
export class IssueComponent extends LitElement {
  saveForm() {
    const response = fetch(
      "https://api.github.com/repos/anoblet/my-project/issues",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization:
            "Basic " +
            btoa(`${config.github.username}:${config.github.password}`)
        },
        body: JSON.stringify(this._data)
      }
    ).then(response => {
      toast("Issue created");
    });
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
        label: "Title",
        type: String
      },
      body: {
        label: "Comment",
        type: String
      }
    };
  }

  render() {
    return html`
      <card-component title="Create an issue">
        ${renderForm(this, null, (property: string, value: any) => {
          this._data = {...this._data, ... {[property]: value}};
        })}
        ${JSON.stringify(this._data)}
        <div slot="actions">
          <button @click=${() => this.saveForm()}>Test</button>
        </div>
      </card-component>
    `;
  }
}

window.customElements.define("issue-component", IssueComponent);

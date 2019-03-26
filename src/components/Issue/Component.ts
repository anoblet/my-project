import { LitElement, customElement, property } from "lit-element";
import { createIssue } from "../Github/CreateIssue";
import Style from "./Style";
import GlobalStyle from "../../GlobalStyle";
import Template from "./Template";
import { toast } from "../Toast/Toast";

// Should this be a view only component or get it's own data?
@customElement("issue-component")
export class IssueComponent extends LitElement {
  @property({ type: Object }) public _data: any = {};

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

  static styles = [GlobalStyle, Style];

  public render() {
    return Template.bind(this)();
  }

  // What if saveForm didn't rely on this but took an argument?
  public saveForm() {
    createIssue({ data: this._data })
      .then(() => toast("Issue created"))
      .catch((response: any) => toast(`Could not create issue: ${response}`));
  }
}

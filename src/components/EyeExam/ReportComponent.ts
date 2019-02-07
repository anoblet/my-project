import { html, LitElement, property } from "lit-element";
import style from "./EyeExamStyle";
// import template from "./EyeExamTemplate";

const template = function() {
  return html`
    <grid-component>
      <card-component title="Accuracy"
        ><div slot="content">${getTrue(this.exam)}/${this.exam.length}</div
      ></card-component>
    </grid-component>
  `;
};

const getTrue = (data: any) => {
  return data.map((item: any) => item.result ? 1 : 0).reduce((prev: any, next: any) => prev + next);
};

export class Report extends LitElement {
  @property() public exam: string;

  static get properties() {
    return {
      exam: {
        type: Object,
        label: "Exam"
      }
    };
  }

  public firstUpdated() {
    getTrue(this.exam);
  }

  static get styles() {
    return [style];
  }

  public render() {
    return template.bind(this)();
  }
}
window.customElements.define("eye-exam-report", Report);

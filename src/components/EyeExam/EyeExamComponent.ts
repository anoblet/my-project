import { html, LitElement } from "lit-element";
export class EyeExamComponent extends LitElement {
  render() {
    return html`
      <eye-test></eye-test>
    `;
  }
}
window.customElements.define("eye-exam", EyeExamComponent);

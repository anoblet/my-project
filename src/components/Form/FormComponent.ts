import { LitElement, html, customElement, property } from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
  @property() fields: unknown;

  _data = {};

  render() {
    return html``;
  }
}

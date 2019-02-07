import { LitElement, html, customElement, property } from "lit-element";

@customElement("form-component")
export class FormComponent extends LitElement {
  @property() public fields: unknown;

  public _data = {};

  public render() {
    return html``;
  }
}

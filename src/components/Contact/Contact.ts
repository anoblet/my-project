import * as style from "./Contact.scss";

import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import template from "./ContactTemplate";

@customElement("contact-component")
export class Contact extends LitElement {
  send() {
    toast("Email not set up yet");
  }

  static get styles() {
    return [GlobalStyle];
  }
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

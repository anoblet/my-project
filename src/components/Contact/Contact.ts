import * as style from "./Contact.scss";

import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import template from "./ContactTemplate";

import { toast } from "../../Toast";

@customElement("contact-component")
export class Contact extends LitElement {
  send() {
    setTimeout(() => toast("Our email has not been set up yet :/"), 2000);
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

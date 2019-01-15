import {
  html,
  LitElement,
  customElement,
  property
} from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store";
import * as style from "./Contact.scss";
import template from "./ContactTemplate";

@customElement("contact-component")
export class Contact extends LitElement {
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

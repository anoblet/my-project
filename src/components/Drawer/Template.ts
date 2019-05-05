import { html } from "lit-element";
import { navigation } from "../Layout/Template";

export default function() {
  return html`
    ${navigation.bind(this)()}
  `;
}

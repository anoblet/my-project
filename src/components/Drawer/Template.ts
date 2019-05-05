import { html } from "lit-element";
import { isAdmin } from "../../User";
import { drawer } from "../Layout/Template";

export default function() {
  return html`
    ${drawer()}
  `;
}

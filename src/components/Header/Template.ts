import { html } from "lit-element";
import { primaryColorSelect } from "../Theme/PrimaryColorSelect";

export default function() {
  return html`
    <slot></slot>
    <!-- <slot name="choose-theme"></slot> -->
  `;
}

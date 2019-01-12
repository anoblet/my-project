import { html } from "lit-element";
import * as style from "./AppHeader.scss";

export default function({  }: any) {
  return html`
    <style>
      ${style}
    </style>
    <slot></slot>
  `;
}

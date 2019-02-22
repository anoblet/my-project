import { html } from "lit-element";
import style from "./MyLoader.scss";

export default function(props: any) {
  return html`
    <style>
      ${style}
    </style>
    <div class="loader"></div>
  `;
}

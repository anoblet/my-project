import { css, html } from "lit-element";
import { getReadme } from "../Readme/Readme";

export default function() {
  return html`
    <my-grid id="content-grid">
      <blog-component> </blog-component>
    </my-grid>
  `;
}

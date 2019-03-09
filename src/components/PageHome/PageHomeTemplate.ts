import { html } from "lit-element";

// @deprecated in favor of PageStatic

export default function() {
  return html`
    <my-grid id="content-grid">
      <blog-component> </blog-component>
    </my-grid>
  `;
}

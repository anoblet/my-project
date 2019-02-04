import { html } from "lit-element";
import { getReadme } from "../Readme";
export default function() {
  return html`
    <my-grid id="content-grid"
      ><card-component title="Readme"
        ><div slot="content">${getReadme()}</div></card-component
      >
      <blog-component> </blog-component>
    </my-grid>
  `;
}

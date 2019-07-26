import { html } from "lit-element";
import "@anoblet/markdown-component";

export default function() {
  return html`
    <markdown-component
      src="https://raw.githubusercontent.com/anoblet/my-project/master/README.md"
    ></markdown-component>
  `;
}

import { html } from "lit-element";

export default function() {
  return html`
    <button-component label="Create" outlined @click=${this.createDialog}></button-component>
    <div id="create-dialog" hidden>
      ${createDialog}
    </div>
  `;
}

const createDialog = html`
  <card-component title="Create">Test</card-component>
`;

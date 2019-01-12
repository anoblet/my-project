import { html } from "lit-element";

export default function() {
  return html`
    <a href="/post/create"><mwc-button outlined>New</mwc-button></a>
    <a href="/post/read"><mwc-button outlined>List</mwc-button></a>
  `;
}

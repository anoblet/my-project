import { html } from "@polymer/lit-element";

export default function() {
  return html`
    <a href="/post/create"><mwc-button outlined>New</mwc-button></a>
    <a href="/post/read"><mwc-button outlined>List</mwc-button></a>
    <!--
      <a href="/post/edit"><mwc-button outlined>Update</mwc-button></a>
      <a href="/post/delete"><mwc-button outlined>Delete</mwc-button></a>
    -->
  `;
}

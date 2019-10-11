import { html } from "lit-element";
import { post } from "../Types";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function(post: post) {
  return html`
    <card-component>
      <h4 slot="title">
        <a href="/post/read/${post.id}">${post.title}</a>
      </h4>
      <div slot="body">${unsafeHTML(post.body)}</div>
    </card-component>
  `;
}

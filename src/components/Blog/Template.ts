import { html } from "lit-element";
import { post } from "./Types";
import postTemplate from "./templates/post";

export default function() {
  return html`
    <grid-component>
      ${this.posts.map((post: post) => {
        if (!post.archived) return postTemplate(post);
      })}
    </grid-component>
  `;
}

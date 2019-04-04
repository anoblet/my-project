import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function() {
  return html`
    <grid-component>
      ${this.posts.map((post: any) => {
        if (post.archived) return;
        return html`
          <card-component>
            <h3 slot="title">
              <a
                href="/post/read/${post.id}"
                >${post.title}</a
              >
            </h3>
            <div slot="content">${unsafeHTML(post.body)}</div>
          </card-component>
        `;
      })}
    </grid-component>
  `;
}

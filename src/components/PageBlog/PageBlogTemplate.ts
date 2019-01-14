import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function({ user }: any) {
  return html`
    <collection-list
      path="/posts"
      .renderer="${
        (post: any) =>
          html`
            <my-card collapsible>
              <h3 slot="title">${post.title}</h3>
              <div slot="content">${unsafeHTML(post.content)}</div>
            </my-card>
          `
      }"
    ></collection-list>
  `;
}

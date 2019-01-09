import { html } from "@polymer/lit-element";

export default function({ user }: any) {
  return html`
    <collection-list
      path="/posts"
      .renderer="${
        (post: any) =>
          html`
            <my-card collapsible>
              <h3 slot="title">${post.title}</h3>
              <div slot="content">${post.content}</div>
            </my-card>
          `
      }"
    ></collection-list>
  `;
}

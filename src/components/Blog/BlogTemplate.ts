import { html } from "lit-element";

export default function() {
  return html`
    <collection-list
      path="/posts"
      .renderer="${
        (post: any) =>
          html`
            <my-card collapsible>
              <h3 slot="title">${post.title}</h3>
              <div slot="content">
                <quill-display .value="${post.content}"></quill-display>
              </div>
            </my-card>
          `
      }"
    ></collection-list>
  `;
}

import { html } from "lit-element";
import { until } from "lit-html/directives/until";

export default function() {
  return html`
    ${
      until(
        this.getPosts().then((posts: any) =>
          posts.map(
            (post: any) => html`
              <my-card collapsible>
                <h3 slot="title">${post.title}</h3>
                <div slot="content">
                  <quill-display .value="${post.content}"></quill-display>
                </div>
              </my-card>
            `
          )
        )
      )
    }
  `;
}

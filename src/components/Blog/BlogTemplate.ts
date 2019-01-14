import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function() {
  return html`
    ${
      until(
        this.getPosts().then((posts: any) =>
          posts.map(
            (post: any) => html`
              <my-card collapsible>
                <h3 slot="title">
                  ${post.title}${
                    this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
                      ? html`
                          <a href="/post/edit/${post.id}"
                            ><button>Edit</button></a
                          >
                        `
                      : ""
                  }
                </h3>
                <div slot="content">${unsafeHTML(post.content)}</div>
              </my-card>
            `
          )
        )
      )
    }
  `;
}

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
                  <a href="/post/read/${post.id}">${post.title}</a>${
                    this.state.app.mode === "experimental"
                      ? this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
                        ? html`
                            <a href="/post/edit/${post.id}"
                              ><mwc-icon>edit</mwc-icon></a
                            >
                          `
                        : ""
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

import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default function() {
  return html`
    ${
      this.posts
        ? this.posts.map(
            (post: any) => html`
              <card-component collapsible>
                <h3 slot="title">
                  <a
                    href="/post/read/${post.id}"
                    style="display: flex; align-items: center;"
                    >${post.title}</a
                  >${
                    this.state.app.settings
                      ? this.state.app.settings.mode >= 2
                        ? this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
                          ? html`
                              <a
                                href="/post/edit/${post.id}"
                                style="display: flex; align-items: center;"
                                ><mwc-icon>edit</mwc-icon></a
                              >
                            `
                          : ""
                        : ""
                      : ""
                  }
                </h3>
                <div slot="content">${unsafeHTML(post.content)}</div>
              </card-component>
            `
          )
        : ""
    }
  `;
}

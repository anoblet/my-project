import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { isAdmin } from "../../User";
import { store } from "../../Store";

export default function() {
  const state = store.getState();
  return html`
    <grid-component>
      ${this.posts.map((post: any) => {
        if (post.archived) return;
        return html`
          <card-component collapsible>
            <h3 slot="title">
              <a
                href="/post/read/${post.id}"
                style="display: flex; align-items: center;"
                >${post.title}</a
              >${state.app.settings
                ? state.app.settings.mode >= 2
                  ? isAdmin()
                    ? html`
                        <a
                          href="/post/edit/${post.id}"
                          style="display: flex; align-items: center;"
                          ><mwc-icon>edit</mwc-icon></a
                        >
                      `
                    : ""
                  : ""
                : ""}
            </h3>
            <div slot="content">${unsafeHTML(post.body)}</div>
          </card-component>
        `;
      })}
    </grid-component>
  `;
}

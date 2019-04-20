import { html } from "lit-element";
import { isAdmin } from "../../User";

export default function() {
  return html`
    <card-component .shadow=${false}>
      <div slot="content">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li>
            <a href="https://github.com/anoblet/docs" target="_blank"
              >Documentation</a
            >
          </li>
          <li><a href="/components">Components</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/performance">Performance</a></li>
          <li><a href="/readme">Readme</a></li>
          ${isAdmin()
            ? html`
                <a href="/admin"><li>Admin</li></a>
              `
            : ""}
        </ul>
      </div>
    </card-component>
    <card-component .shadow=${false}>
      <div slot="content" style="overflow: initial;">
        <ul>
          <li><a href="/sitemap">Sitemap</a></li>
        </ul>
      </div>
    </card-component>
    <card-component .shadow=${false}>
      <div slot="content" style="overflow: initial;">
        <ul>
          <li><a href="/issue">Report an issue</a></li>
        </ul>
      </div>
    </card-component>
  `;
}

import { html } from "lit-element";
import { filterByMode } from "../../Debug";
import { isAdmin } from "../../User";

export default function() {
  return html`
    <card-component>
      <div slot="content">
        <ul>
          <a href="/"> <li>Home</li></a>
          ${filterByMode(0)
            ? html`
                <a href="/components"> <li>Components</li></a>
              `
            : ""}
          <a href="/contact"> <li>Contact</li></a>
          ${isAdmin
            ? html`
                <a href="/admin"><li>Admin</li></a>
              `
            : ""}
        </ul>
      </div>
    </card-component>
    <card-component>
      <div slot="content" style="overflow: initial;">
        <ul>
          <li><a href="/">Report an issue</a></li>
        </ul>
      </div>
    </card-component>
  `;
}

import { html } from "lit-element";
import { render } from "lit-html";
import { filterByMode } from "../../Debug";

export default function() {
  return html`
    <card-component>
      <div slot="content" style="overflow: initial;">
        <ul>
          <a href="/"> <li>Home</li></a>
          ${filterByMode(0)
            ? html`
                <a href="/components"> <li>Components</li></a>
              `
            : ""}
          <a href="/contact"> <li>Contact</li></a>
          ${this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
            ? html`
                <a href="/admin"><li>Admin</li></a>
              `
            : ""}
        </ul>
        <ul>
          <li><a href="/">Report an issue</a></li>
        </ul>
      </div>
    </card-component>
  `;
}

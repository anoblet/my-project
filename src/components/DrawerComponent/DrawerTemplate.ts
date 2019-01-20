import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <card-component>
      <div slot="content" style="overflow: initial;">
        <ul>
          <a href="/"> <li>Home</li></a>
          ${
            this.state.app.settings
              ? this.state.app.settings.mode >= 1
                ? html`
                    <a href="/components"> <li>Components</li></a>
                  `
                : ""
              : ""
          }
          <a href="/contact"> <li>Contact</li></a>
          ${
            this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
              ? html`
                  <a href="/admin"><li>Admin</li></a>
                `
              : ""
          }
        </ul>
      </div>
    </card-component>
  `;
}

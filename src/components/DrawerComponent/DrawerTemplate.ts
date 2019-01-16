import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <card-component>
      <div slot="content">
        <ul>
          <a href="/"> <li>Home</li></a
          ><!-- <a href="/blog"> <li>Blog</li></a>
          --><a href="/contact"> <li>Contact</li></a>
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

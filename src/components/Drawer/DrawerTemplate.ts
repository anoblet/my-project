import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <ul>
      <a href="/"> <li>Home</li></a
      ><a href="/blog"> <li>Blog</li></a
      ><a href="/contact"> <li>Contact</li></a>
    </ul>
    ${
      this.state.user.uid === "m42gwHOSlbUniorNjigqa1nnHIE3"
        ? html`
            <a href="/admin">Admin</a>
          `
        : ""
    }
  `;
}

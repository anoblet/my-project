import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <form>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" /> <button>Send</button>
    </form>
  `;
}

import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <card-component title="Contact">
      <form>
        <grid-component>
          <label>Email</label
          ><input name="email" placeholder="john@example.com" />
          <label>Subject</label><input name="subject" placeholder="Subject" />
          <label>Message</label
          ><textarea name="message" placeholder="Message"></textarea>
        </grid-component>
      </form>
      <div slot="actions"><mwc-button>Send</mwc-button></div>
    </card-component>
  `;
}

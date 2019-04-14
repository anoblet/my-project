import { html } from "lit-element";

export default function() {
  return html`
    <card-component title="Contact">
      <div slot="content">
        <form>
          <grid-component>
            <label>Email</label
            ><input name="email" type="email" placeholder="john@example.com" />
            <label>Subject</label
            ><input name="subject" type="text" placeholder="Subject" />
            <label>Message</label
            ><textarea name="message" placeholder="Message"></textarea>
          </grid-component>
        </form>
      </div>
      <div slot="actions">
        <mwc-button @click="${this.send}">Send</mwc-button>
      </div>
    </card-component>
  `;
}

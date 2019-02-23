import { html } from "lit-element";

export default function() {
  return html`
    <a
      href="https://github.com/anoblet/my-project"
      rel="noreferrer"
      target="_blank"
    >
      <mwc-fab id="github" icon="code" label="placeholder" mini></mwc-fab>
    </a>
    <a href="/"> <mwc-fab id="home" icon="home" label="Home"></mwc-fab> </a>
    <a href="mailto: andrewbnoblet@gmail.com">
      <mwc-fab icon="mail_outline" label="placeholder" mini></mwc-fab>
    </a>
  `;
}

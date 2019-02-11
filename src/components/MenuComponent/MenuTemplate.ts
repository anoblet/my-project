import { html } from "lit-element";

export default function() {
  return html`
    <div id="home" style="position: absolute; z-index: 1">
      <a href="/"><mwc-fab icon="home"></mwc-fab></a>
    </div>
    <ul id="menu">
      <li>
        <a href="/blog"><mwc-fab icon="subject"></mwc-fab></a>
      </li>
      <li>
        <a href="/user-theme"><mwc-fab icon="brush"></mwc-fab></a>
      </li>
      <li>
        ><a @click=${() => {}}><mwc-fab icon="share"></mwc-fab></a>
      </li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
    </ul>
  `;
}

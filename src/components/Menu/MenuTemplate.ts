import { html } from "lit-element";

export default function() {
  return html`
    <div id="home" style="position: absolute; z-index: 1">
      <a href="/"><mwc-fab icon="home"></mwc-fab></a>
    </div>
    <ul id="menu">
      <li>
        <a href="/user/posts"><mwc-fab icon="subject"></mwc-fab></a>
      </li>
      <li><a href="/user/theme"><mwc-fab icon="brush"></a></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
    </ul>
  `;
}

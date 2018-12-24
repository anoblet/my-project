import "@material/mwc-fab";
import { html } from "@polymer/lit-element";

export default function() {
  return html`
    <ul id="menu">
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="subject"></mwc-fab></li>
      <li><mwc-fab icon="brush"></mwc-fab></li>
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="home"></mwc-fab></li>
    </ul>
  `;
}

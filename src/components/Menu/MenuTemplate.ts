import "@material/mwc-fab";
import { html } from "@polymer/lit-element";

export default function() {
  return html`
    <div id="home" style="position: absolute;">
      <mwc-fab icon="home"></mwc-fab>
    </div>
    <ul id="menu">
      <li><mwc-fab icon="home"></mwc-fab></li>
      <li><mwc-fab icon="subject"></mwc-fab></li>
      <li><mwc-fab icon="brush"></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
      <li><mwc-fab></mwc-fab></li>
    </ul>
  `;
}

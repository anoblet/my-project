import { html } from "lit-element";
import header from "./templates/Header";
import drawer from "./templates/Drawer";
import footer from "./templates/Footer";

export default function() {
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <drawer-component onScroll=${this.onScroll}
      ><div id="drawer" slot="drawer">${drawer()}</div>
      <div slot="main">
        <profile-menu id="profile-menu"></profile-menu>
        <div id="portal"></div>
      </div>
    </drawer-component>
    <div id="footer">
      ${footer()}
    </div>
  `;
}

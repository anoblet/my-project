import { html } from "lit-element";
import header from "./templates/Header";
import drawer from "./templates/Drawer";
import footer from "./templates/Footer";
import made_with from "../../templates/MadeWith";
import "../Breadcrumb/Component";

export default function() {
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <drawer-component ?absolute=${this.mediaSize === "mobile"}
      ><div id="drawer" slot="drawer">${drawer()}</div>
      <div slot="main">
        <breadcrumb-component .activeRoute=${this.activeRoute}></breadcrumb-component>
        <profile-menu id="profile-menu"></profile-menu>
        <div id="portal"></div>
        <span id="made_with">${made_with()}</span>
      </div>
    </drawer-component>
    <div id="footer">
      ${footer()}
    </div>
  `;
}

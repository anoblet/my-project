import { html } from "lit-element";
import header from "./templates/Header";
import drawer from "./templates/Drawer";
import footer from "./templates/Footer";
import made_with from "../../templates/MadeWith";

export default function() {
  return html`
    <div id="header">
      ${header.bind(this)()}
    </div>
    <drawer-component ?absolute=${this.mediaSize === "mobile"}
      ><div id="drawer" slot="drawer">${drawer()}</div>
      <div slot="main">
        <breadcrumb-component
          .activeRoute=${this.location.pathname}
        ></breadcrumb-component>
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

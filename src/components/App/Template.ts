import { html } from "lit-element";
import { header } from "../Layout/Template";
import drawer from "./templates/Drawer";

export default function() {
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <drawer-component
      ><div id="drawer" slot="drawer">${drawer()}</div>
      <div id="portal" slot="main"></div
    ></drawer-component>
    <footer-component id="bottom"></footer-component>
  `;
}

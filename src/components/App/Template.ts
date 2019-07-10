import { html } from "lit-element";
import { store } from "../../Store";
import { header } from "../Layout/Template";
import drawer from "./templates/Drawer";


/**
 * Template function should render sub-templates
 * Indicative by a sub-template directory
 * A helper function would need to wrap the "auto" templates
 * Drawer needs to be separated into a factory with a boolean
 * App doesn't need to know about drawer-container in layout
 */
export default function() {
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <drawer-component
      ><div id="drawer" slot="drawer">${drawer()}</div>
      <div slot="main"><div id="portal"></div></div
    ></drawer-component>
    <footer-component id="bottom"></footer-component>
  `;
}

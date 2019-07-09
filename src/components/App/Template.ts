import { html } from "lit-element";
import { store } from "../../Store";
import { header, navigation } from "../Layout/Template";

const getSettings = () => {
  const state = store.getState();
  return state.settings;
};

/**
 * Template function should render sub-templates
 * Indicative by a sub-template directory
 * A helper function would need to wrap the "auto" templates
 * Drawer needs to be separated into a factory with a boolean
 * App doesn't need to know about drawer-container in layout
 */
export default function() {
  const settings = getSettings();
  return html`
    <header-component>
      ${header.bind(this)()}
    </header-component>
    <drawer-component
      ><div slot="drawer">${navigation()}</div>
      <div slot="main"><div id="portal"></div></div
    ></drawer-component>
    <footer-component id="bottom"></footer-component>
  `;
}

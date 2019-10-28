import { LitElement, css, customElement, property, unsafeCSS } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import Template from "./Template";
import muuri from "muuri";

import("../muuri/component");

const beforeRender = async () => {
  return;
};

export interface DashboardComponent {
  src: string;
}

const styleImport = require("./style.css");
const style = css`
  ${unsafeCSS(styleImport)}
`;

/**
 * Chromecast idle screen replacement
 *
 * @param  "dasboard-component" [description]
 * @return                      [description]
 */

@customElement("dashboard-component")
export class Dashboard extends BeforeRender(LitElement) {
  public static styles = [style];
  public render = Template.bind(this);

  @property() public itemArray: any;

  public beforeRender = beforeRender;

  public firstUpdated() {
    const grid = new muuri(this.shadowRoot.querySelector(".grid"), {
      dragEnabled: true,
      layout: {
        fillGaps: true
      },
      layoutOnResize: 250
    });
    window.addEventListener("drawer-toggled", function() {
      setTimeout(() => grid.layout(), 0);
    });
  }
}

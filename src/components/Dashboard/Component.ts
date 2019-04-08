import { LitElement, customElement, property } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import Style from "./Style";
import Template from "./Template";
import muuri from "muuri";

import("../muuri/component");

const beforeRender = async () => {
  await import("../Grid/Component");
};

export interface DashboardComponent {
  src: string;
}

/**
 * Chromecast idle screen replacement
 *
 * @param  "dasboard-component" [description]
 * @return                      [description]
 */

@customElement("dashboard-component")
export class Dashboard extends BeforeRender(LitElement) {
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
      setTimeout(() => grid.refreshItems().layout(), 0);
    });
  }

  public static styles = [Style];

  public render() {
    return Template.bind(this)();
  }
}

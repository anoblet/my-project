import { LitElement, customElement, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";
// @ts-ignore
import muuri from "muuri";
import Style from "./Style";
import Template from "./Template";

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

@customElement("dasboard-component")
export class Dashboard extends BeforeRender(LitElement) {
  @property() public itemArray: any;

  public beforeRender = beforeRender;

  firstUpdated() {
    var grid = new muuri(this.shadowRoot.querySelector(".grid"), {
      dragEnabled: true,
      layout: {
        fillGaps: true
      }
    });
    window.addEventListener("drawer-toggled", function() {
      setTimeout(() => grid.refreshItems().layout(), 0);
    });
  }

  static get styles() {
    return Style;
  }

  public render() {
    return Template.bind(this)();
  }
}

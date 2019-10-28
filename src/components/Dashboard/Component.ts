import {
  LitElement,
  css,
  customElement,
  property,
  query,
  unsafeCSS
} from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import { ResizeObserver } from "resize-observer";
import Template from "./Template";
import { debounce } from "debounce";
import muuri from "muuri";

const beforeRender = async () => {
  return;
};

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

  @query(".grid") public grid: any;

  public beforeRender = beforeRender;

  public firstUpdated() {
    const grid = new muuri(this.grid, {
      dragEnabled: true,
      layout: {
        fillGaps: true
      },
      layoutOnResize: false
    });
    const ro = new ResizeObserver(debounce(grid.layout.bind(grid), 100));
    ro.observe(this.grid);
  }
}

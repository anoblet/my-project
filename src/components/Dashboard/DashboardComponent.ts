import { LitElement, css, customElement, html, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";
// @ts-ignore
import muuri from "muuri";
import Style from "./Style";

const beforeRender = async () => {
  await import("../Grid/GridComponent");
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
    console.log(this.shadowRoot.querySelector(".grid"));
    // @ts-ignore
    var grid = new muuri(this.shadowRoot.querySelector(".grid"), {
      dragEnabled: true,
      layout: {
        fillGaps: true
      }
    });
    window.addEventListener("drawer-toggled", function() {
      grid.refreshItems().layout();
    });
  }

  static get styles() {
    return Style;
  }

  public render() {
    return html`
      <div class="grid">
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/195/400/any?1" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/400/195/any?2" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/195/400/any?3" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/400/195/any?4" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/195/400/any?5" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/400/195/any?6" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/195/400/any?7" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/400/195/any?8" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/195/400/any?9" />
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <img src="https://placeimg.com/400/195/any?10" />
          </div>
        </div>
      </div>
    `;
  }
}

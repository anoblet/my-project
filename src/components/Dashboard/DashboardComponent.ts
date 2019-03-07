import { LitElement, customElement, html, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";

const beforeRender = async () => {
  await import("../GridComponent/GridComponent");
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

  public render() {
    return html`
      <grid-component
        >${this.itemArray.map((item: any) => {
          return;
        })}</grid-component
      >
    `;
  }
}

import { LitElement, customElement, html, property } from "lit-element";
// import "../GridComponent/GridComponent";

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
export class Dashboard extends LitElement {
  @property() public itemArray: any;
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

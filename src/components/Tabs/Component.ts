import { LitElement, customElement, property } from "lit-element";

import Style from "./Style";
import Template from "./Template";

/**
 * Tabs
 */
@customElement("component-tabs")
export class Tabs extends LitElement {
  public static styles = [Style];
  public render = Template.bind(this);

  public firstUpdated() {
    const tabs = Array.from(this.shadowRoot.querySelectorAll("component-tab"));
    const labels = [];
    tabs.map((tab: any) => {
      labels.push(tab.label);
    });
    tabs.map(tab => {
      const label = tab.querySelector("[slot='label']");
      label.addEventListener("click", () => {});
    });
  }
}

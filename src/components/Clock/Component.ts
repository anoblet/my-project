import { LitElement, customElement, property, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("clock-component")
export class Clock extends LitElement {
  public static styles = [Style];
  public render = Template.bind(this);

  @property() public time: any;

  public firstUpdated() {
    this.start();
  }

  public start() {
    this.time = setTime();
    setTimeout(() => {
      this.start();
    }, 1000);
  }
}

export const setTime = () => {
  const date = new Date();
  let h: any = date.getHours(); // 0 - 23
  let m: any = date.getMinutes(); // 0 - 59
  let s: any = date.getSeconds(); // 0 - 59
  let session = "AM";

  if (h === 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return html`
    ${h}:${m}:${s} ${session}
  `;
};

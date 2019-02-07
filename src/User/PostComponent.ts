import * as style from "./PostComponent.scss";

import { LitElement, html, property } from "lit-element";

import { TemplateMixin } from "../../packages/TemplateMixin";
import { Mixin } from "../../packages/Mixin";
import Template from "./PostComponentTemplate";

export class PostComponent extends Mixin(LitElement, [TemplateMixin]) {
  @property({ type: Object }) data: any;
  @property({ type: Object }) structure: any;

  getWeekday(date: any) {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[date];
  }

  getMonth() {}

  formatDate(date: any) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const dateFormatted = date.toLocaleDateString("en-US", options);
    return html`
      ${dateFormatted}
    `;
  }

  render() {
    if (!this.data) return;
    const data = this.data;
    return html`
      ${data.title} ${this.formatDate(data.date.toDate())} ${data.author}
    `;
  }
}

window.customElements.define("user-post-component", PostComponent);

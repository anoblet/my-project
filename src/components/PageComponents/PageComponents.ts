import { html, LitElement, property } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import style from "./PageComponentsStyle";
import template from "./PageComponentsTemplate";
import globalStyles from "../../Styles";

import(/* webpackChunkName: "EyeChart" */ "../EyeChart/EyeChartComponent");
import(/* webpackChunkName: "EyeTest" */ "../EyeTest/EyeTestComponent");
import(/* webpackChunkName: "WebSpeech" */ "../WebSpeech/WebSpeechComponent");

const components = ["eye-chart"];

export class PageComponents extends LitElement {
  @property() component: string;

  firstUpdated() {
    // if(this.component)
  }

  static get styles() {
    return [globalStyles, style];
  }

  get template() {
    if (!this.component) return template.bind(this)();
    else {
      return html`
        ${unsafeHTML(`<${this.component}></${this.component}>`)}
      `;
    }
  }

  public render() {
    return this.template;
  }
}

window.customElements.define("page-components", PageComponents);

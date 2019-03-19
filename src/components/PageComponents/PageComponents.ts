import { LitElement, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { components } from "../../Components";
import style from "./PageComponentsStyle";
import template from "./PageComponentsTemplate";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

import(/* webpackChunkName: "EyeExam" */ "../EyeExam/EyeExamComponent");
import(/* webpackChunkName: "WebSpeech" */ "../WebSpeech/WebSpeechComponent");
import(/* webpackChunkName: "PropertyEditor" */ "../PropertyEditor/PropertyEditor");
import("../Collection/CollectionList");
import("../ColorPicker");
import("../Dashboard/DashboardComponent");
import("../PhilipsHue/LightsComponent");
import("../PhilipsHue/Demo");
import("../Contacts/Component");
import("../muuri/component");

export class PageComponents extends LitElement {
  @property() public component: string;
  @property() public components: unknown;

  static get styles() {
    return [GlobalStyle, style];
  }

  get template() {
    if (!this.component) return template.bind(this)();
    else {
      return html`
        ${unsafeHTML(`<${this.component}></${this.component}>`)}
      `;
    }
  }

  public connectedCallback() {
    super.connectedCallback();
    this.components = components;
    components.map((component: any) => {
      if (component.tag === this.component) component.src();
    });
  }

  public render() {
    return this.template;
  }
}

window.customElements.define("page-components", PageComponents);

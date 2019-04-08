import { LitElement, customElement, html, property } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import Style from "./PageComponentsStyle";
import Template from "./PageComponentsTemplate";
import { components } from "../../Components";
import { renderForm } from "../Form/Form";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

@customElement("page-components")
export class PageComponents extends BeforeRender(LitElement) {
  @property() public component: string;
  @property() public components: unknown;

  public static styles = [GlobalStyle, Style];

  public async beforeRender() {
    if (!this.component) return;
    components.map((component: any) => {
      if (component.tag === this.component) component.src();
    });
  }

  get template() {
    const element: any = document.createElement(this.component);
    console.log(element);
    const properties = element.constructor.properties;
    console.log(properties);
    return html`
      ${renderForm({
        onChange: (_property: string, value: any) =>
          (element[_property] = value),
        structure: properties
      })}
      ${unsafeHTML(`<${this.component}></${this.component}>`)}
    `;
  }

  public connectedCallback() {
    super.connectedCallback();
    this.components = components;
    components.map((component: any) => {
      if (component.tag === this.component) component.src();
    });
  }

  public render() {
    return this.component
      ? html`
          ${unsafeHTML(`<${this.component}></${this.component}>`)}
        `
      : Template.bind(this)();
  }
}

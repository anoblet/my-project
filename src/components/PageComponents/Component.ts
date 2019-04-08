import { LitElement, customElement, html, property } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import GlobalStyle from "../../GlobalStyle";
import Style from "./PageComponentsStyle";
import Template from "./PageComponentsTemplate";
import { components } from "../../Components";
import { renderForm } from "../Form/Form";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { Weather } from "../Weather/Component";

@customElement("page-components")
export class PageComponents extends BeforeRender(LitElement) {
  @property() public component: string;
  @property() public components = components;

  public static styles = [GlobalStyle, Style];

  public async beforeRender() {
    if (this.component)
      components.map((component: any) => {
        if (component.tag === this.component) component.src();
      });
  }

  public render() {
    const element: any = document.createElement(this.component);
    this.renderRoot.appendChild(element);

    return this.component
      ? html`
          ${unsafeHTML(`<${this.component}></${this.component}>`)}
        `
      : Template.bind(this)();
  }
}

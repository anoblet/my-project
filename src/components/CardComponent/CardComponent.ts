import { LitElement, css, html, customElement, property } from "lit-element";
import * as style from "./Card.scss";
import template from "./CardTemplate";

@customElement("card-component")
export class CardComponent extends LitElement {
  @property({ type: Boolean }) collapsible: boolean = false;
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) shadow: boolean = true;

  firstUpdated(changedProperties: any) {
    this.addListeners();
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  addListeners() {
    if (this.collapsible) {
      const title = this.shadowRoot.querySelector("#title");
      if (title) title.addEventListener("click", () => this.toggle());
    }
  }

  static get styles() {
    return [
      css`
        :host {
          padding: var(--padding, 1em);
        }
      `
    ];
  }
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

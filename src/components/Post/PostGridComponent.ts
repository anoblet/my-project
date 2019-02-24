import * as style from "./PostGridComponent.scss";

import { LitElement, css, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import template from "./PostGridComponentTemplate";
import { getCollection } from "../../../packages/firebase-helpers";

export class PostGridComponent extends LitElement {
  @property({ type: Array }) public items: any;
  @property({ type: Boolean }) public taskPending = true;

  public deleteItem(index: number) {
    const items = this.items;
    const item = items.splice(index, 1);
    this.items = [...items];
    this.dispatchEvent(
      new CustomEvent("item-deleted", {
        composed: true,
        detail: item[0]
      })
    );
  }

  public async beforeRender() {
    getCollection({
      path: "posts"
    }).then((collection: any) => {
      this.items = collection;
      this.taskPending = false;
    });
  }

  public shouldUpdate(changedProperties: any) {
    if (this.taskPending) return false;
    else return super.shouldUpdate(changedProperties);
  }

  static get styles() {
    return [
      GlobalStyle,
      css`
        card-component {
          max-width: 100%;
        }
      `
    ];
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("post-grid-component", PostGridComponent);

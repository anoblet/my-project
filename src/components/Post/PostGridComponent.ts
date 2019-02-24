import { LitElement, css, html, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { getCollection } from "../../../packages/firebase-helpers";
import template from "./PostGridComponentTemplate";

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
    return getCollection({
      path: "posts"
    }).then((collection: any) => {
      this.items = collection;
    });
  }

  static get styles() {
    return [
      GlobalStyle,
      css`
        * {
          box-sizing: border-box;
        }

        :host {
          display: flex;
          flex: 1;
        }

        .grid {
          display: grid;
          flex: 1;
          height: min-content;
        }

        .row {
          /*
        display: flex;
        */
          display: grid;
          grid-template-columns: min-content 1fr min-content;
        }

        .column {
          flex: 1;
          padding: 0.5em 1em;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .no-grow {
          flex-grow: 0;
        }

        .no-visibility {
          visibility: hidden;
        }

        card-component {
          max-width: 100%;
        }
      `
    ];
  }

  public render() {
    return template.bind(this)()
  }
}

window.customElements.define("post-grid-component", PostGridComponent);

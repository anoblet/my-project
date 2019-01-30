import { css, customElement, html, LitElement, property } from "lit-element";
import { BaseElement } from "../../BaseElement";
import template from "./BlogTemplate";
import { getCollection } from "../../../packages/firebase-helpers";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { store } from "../../Store";
import("@material/mwc-icon");
import globalStyle from "../../GlobalStyle"

// @customElement("blog-component")
export class Blog extends Mixin(connect(store)(BaseElement), [
  TaskMixin
]) {
  @property() loaded: any;
  @property() posts: any;

  constructor() {
    super();
    getCollection({
      callback: (collection: any) => {
        this.posts = collection;
        this.loaded = true;
      },
      path: "posts",
      orderBy: "sortOrder",
      watch: true
    });
  }

  shouldUpdate(changedProperties: any) {
    if (!this.loaded) return false;
    else return super.shouldUpdate(changedProperties);
  }

  static get styles() {
    return [
      globalStyle,
      css`
        * {
          box-sizing: border-box;
        }

        :host {
          display: grid;
          grid-gap: 1em;
          flex: 1;
          position: relative;
        }
      `
    ];
  }

  public render() {
    return html`
      ${template.bind(this)()}
    `;
  }
}

window.customElements.define("blog-component", Blog);

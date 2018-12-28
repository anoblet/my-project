import * as style from "./PostComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { Mixin } from "../../packages/Mixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import model from "./Post.json";
import { navigate } from "lit-redux-router";
import { store } from "../store.js";
import { until } from "lit-html/directives/until";

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends Mixin(LitElement, [FirebaseMixin]) {
  @property({ type: Boolean }) editable: boolean;
  @property({ type: String }) id: string;
  @property({ type: String }) author: string;
  @property({ type: String }) title: string;
  @property({ type: String }) content: string;

  constructor() {
    super();
    this.model = model;
  }

  firstUpdated() {
    if (this.id)
      this.watchDocumentNew({
        path: `posts/${this.id}`,
        callback: (document: any) => {
          if (document) {
            const keys = Object.keys(document);
            keys.map((key: any) => (this[key] = document[key]));
          }
        }
      });
  }

  text({ field, value }: any) {
    return html`
      <vaadin-text-field
        name="${field.name}"
        label="${field.label}"
        value="${value}"
      ></vaadin-text-field>
    `;
  }

  textarea({ field, value }: any) {
    return html`
      <vaadin-text-area
        name="${field.name}"
        label="${field.label}"
        value="${value}"
      ></vaadin-text-area>
    `;
  }

  submitForm(e: any) {
    e.preventDefault();
    const title = this.shadowRoot.querySelector(
      "[name='title']"
    ) as HTMLInputElement;
    const author = this.shadowRoot.querySelector(
      "[name='author']"
    ) as HTMLInputElement;
    const content = this.shadowRoot.querySelector(
      "[name='content']"
    ) as HTMLInputElement;
    const data: any = {
      title: title.value,
      author: author.value,
      content: content.value
    };

    this.updateDocument({ path: `posts/${this.id}`, data }).then(
      (result: any) => {
        return;
        setTimeout(
          () => this.store.dispatch(navigate(`/post/read/${result}`)),
          2000
        );
      }
    );
  }

  render() {
    return html`
      ${
        until(
          import("./PostComponentTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("post-component", PostComponent);

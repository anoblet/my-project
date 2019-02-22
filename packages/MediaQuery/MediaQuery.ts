import { html, LitElement, property } from "lit-element";
import { Mixin } from "../Mixin";
import { StateMixin } from "../StateMixin";
import { TaskMixin } from "../TaskMixin";
import * as style from "./MediaQuery.scss";
import Template from "./MediaQueryTemplate";

export class MediaQuery extends Mixin(LitElement, [TaskMixin]) {
  @property({ type: Boolean, reflect: true }) public hidden = false;
  // @property({ type: String, attribute: 'max-width' }) public maxWidth = false;
  // @property({ type: String, attribute: 'min-width' }) public minWidth = false;
  @property({ type: String }) public query: string;

  public connectedCallback() {
    super.connectedCallback();
    let query: any;
    if (!this.query) {
      if (this.maxWidth) {
        query = `(max-width: ${this.maxWidth})`;
      }
      if (this.minWidth) {
        query = `(min-width: ${this.minWidth})`;
      }
    }
    query = this.query ? this.query : query;
    if (query) {
      const observer = window.matchMedia(query);
      const myListener = (_observer: any) => {
        if (_observer.matches) {
          this.hidden = false;
        } else {
          this.hidden = true;
        }
      };
      myListener(observer);
      observer.addListener(myListener);
    }
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        !this.taskPending
          ? Template.bind(this)(this.state)
          : html`
              <my-loader></my-loader>
            `
      }
    `;
  }
}

window.customElements.define("media-query", MediaQuery);

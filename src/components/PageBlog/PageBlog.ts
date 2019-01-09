import { html, LitElement } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { BaseMixin } from "../../../packages/BaseMixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import "../../../packages/lorem-ipsum";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { store } from "../../store.js";
import * as style from "./PageBlog.scss";
import Template from "./PageBlogTemplate";
import "../../../packages/Dialog";
import "../../components/CollectionList/CollectionList";

export class PageBlog extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin
]) {
  getPosts() {}

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

window.customElements.define("page-blog", PageBlog);

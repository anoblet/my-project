import { html, LitElement } from "@polymer/lit-element";
import { Mixin } from "../../../packages/Mixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import { StateMixin } from "../../../packages/StateMixin";
import Template from "./AppHeaderTemplate";
import * as Style from "./AppHeader.scss";
import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

export class AppHeader extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin
]) {
  firstUpdated() {
    super.firstUpdated();
    this.setButtonBackground();
  }

  setButtonBackground() {
    const fab = this.querySelector("mwc-fab");
    const button = fab.shadowRoot.querySelector("button");
    if (button) {
      if (this.state.user.photo) {
        button.style.background = `url('${this.state.user.photo}')`;
        button.style.backgroundSize = "contain";
      }
    }
  }

  render() {
    return html`
      <style>
        ${Style}
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

window.customElements.define("app-header", AppHeader);

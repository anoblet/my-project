import { html, LitElement } from "lit-element";
import { Mixin } from "../../../packages/Mixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../Store";
import { StateMixin } from "../../../packages/StateMixin";
import Template from "./AppHeaderTemplate";
import * as Style from "./AppHeader.scss";
import(/* webpackChunkName: "MWCFab" */ "@material/mwc-fab");

export class AppHeader extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin
]) {
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

  resetButton() {
    const fab = this.querySelector("mwc-fab");
    const button = fab.shadowRoot.querySelector("button");
    if (button) {
      button.style.background = "initial";
      button.style.backgroundSize = "initial";
    }
  }

  stateChanged(state: any) {
    super.stateChanged(state);
    console.log(state.user.signedIn);
    if (state.user.signedIn === true) this.setButtonBackground();
    else if (!state.user.signedIn)
      () => {
        console.log("User not logged in");
        this.resetButton();
      };
  }

  render() {
    return html`
      <style>
        ${Style}
      </style>
      ${!this.taskPending
        ? Template.bind(this)(this.state)
        : html`
            <my-loader></my-loader>
          `}
    `;
  }
}

window.customElements.define("app-header", AppHeader);

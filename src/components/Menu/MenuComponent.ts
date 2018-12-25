import "@material/mwc-fab";

import * as style from "./MenuComponent.scss";

import { LitElement, html, property } from "@polymer/lit-element";

import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import Template from "./MenuTemplate";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import { until } from "lit-html/directives/until";

export class MenuComponent extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  @property({ type: Boolean, reflect: true }) hidden = true;

  _onContextMenu(e: any) {
    this.hidden = !this.hidden;
    return false;
  }

  _onKeyUp(e: any) {
    if (e.shiftKey && e.keyCode == 32) {
      this.hidden = !this.hidden;
    }
  }

  stateChanged(state: any) {
    if (state.settings) {
      if (state.settings.rightClick) {
        this.defaultContextMenu = document.oncontextmenu;
        document.bind("contextmenu", (e: any) => this._onContextMenu(e));
      } else {
        document.unbind("contextmenu", (e: any) => this._onContextMenu(e));
      }
    }
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${
        until(
          import("./MenuTemplate.ts").then(module =>
            module.default.bind(this)()
          )
        )
      }
    `;
  }
}

window.customElements.define("menu-component", MenuComponent);

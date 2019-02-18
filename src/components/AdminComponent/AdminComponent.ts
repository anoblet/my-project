import { LitElement, css, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { fields } from "./Settings";
import { store } from "../../Store";
import template from "./AdminTemplate";
import { updateDocument } from "../../../packages/firebase-helpers";

import(/* webpackChunkName: "CardComponent" */ "../CardComponent/CardComponent");
import(/* webpackChunkName: "GridComponent" */ "../GridComponent/GridComponent");

export interface AdminComponent {
  [key: string]: any; // Add index signature
}

// @customElement("admin-component")
export class AdminComponent extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          flex: 1;
        }
      `
    ];
  }

  public find(path: string, object: any) {
    const parts = path.split("/");
    let value = object;
    try {
      parts.map((part: string) => {
        if (!value[part]) throw false;
        value = value[part];
      });
    } catch (error) {
      value = error;
    }
    return value;
  }

  public valueChanged(e: any) {
    const state = store.getState();
    const path = `users/${state.user.uid}/settings/default`;

    const settings: any = {};
    let value;
    if (e.target.nodeName.toLowerCase() === "select") {
      value = e.target.options[e.target.selectedIndex].value;
    }
    settings[e.target.name] = value;
    updateDocument({ path, data: settings });
  }

  public stateChanged(state: any) {
    super.stateChanged();
    this.state = state;
    if (state.app.settings) {
      const path = `users/${state.user.uid}/settings/default`;
      const data = { mode: state.app.settings.mode };
    }
  }

  public render() {
    return template.bind(this)(this.state);
  }
}

window.customElements.define("admin-component", AdminComponent);

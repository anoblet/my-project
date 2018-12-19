import { html, LitElement, property } from "@polymer/lit-element";
import { until } from "lit-html/directives/until";
import { navigate } from "lit-redux-router";
import { store } from "../store.js";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../packages/Mixin";
import { StateMixin } from "../../packages/StateMixin";
import { User } from "../User";

export interface UserController {
  [key: string]: any; // Add index signature
}

export class UserController extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  @property({ type: String }) action: string = "index";
  _template: any;

  connectedCallback() {
    super.connectedCallback();
    this[this.action]();
  }

  index() {
    this._template = html`
      <app-user></app-user>
    `;
  }

  signin() {
    this._template = html`
      <app-user></app-user>
    `;
  }

  signout() {
    const user = new User();
    user.signOut();
    this.setState({}, "user", { merge: false });
    store.dispatch(navigate("/"));
  }

  render() {
    return html`
      ${until(this._template, "")}
    `;
  }
}

window.customElements.define("user-controller", UserController);

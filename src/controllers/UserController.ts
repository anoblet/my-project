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
    this.setStore(store);
    if (this[this.action]) this[this.action]();
  }

  index() {
    const signedIn = this.state.user.signedIn;
    signedIn
      ? store.dispatch(navigate("/user/account"))
      : store.dispatch(navigate("/user/signin"));
    return;
    this._template = html`
      <app-user></app-user>
    `;
  }

  account() {
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
    this.setState(
      {
        backgroundColor: "#242424",
        borderColor: "#CCC",
        textColor: "#CCC",
        primaryColor: "#00ff00",
        secondaryColor: "#ff0080"
      },
      "theme"
    );
    store.dispatch(navigate("/"));
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex: 1;
        }
      </style>
      ${until(this._template, "")}
    `;
  }
}

window.customElements.define("user-controller", UserController);

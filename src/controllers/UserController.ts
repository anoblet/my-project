import { LitElement, html, property } from "@polymer/lit-element";

import { Mixin } from "../../packages/Mixin";
import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { StateMixin } from "../../packages/StateMixin";
import { User } from "../User";
import { connect } from "pwa-helpers/connect-mixin.js";
import { navigate } from "lit-redux-router";
import { store } from "../store.js";
import { until } from "lit-html/directives/until";

import structure from "../post/PostModel";

import("../components/AppUser/AppUser");

export interface UserController {
  [key: string]: any; // Add index signature
}

export class UserController extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: String }) action: string = "index";
  @property({ type: Object }) data: any;
  @property({ type: String }) tail: any;
  _template: any;

  connectedCallback() {
    super.connectedCallback();
    this.setStore(store);
  }

  firstUpdated() {
    if (super.firstUpdated) {
      super.firstUpdated();
    }

    if (this.action == "index") {
      const signedIn = this.state.user.signedIn;
      signedIn
        ? store.dispatch(navigate("/user/account"))
        : store.dispatch(navigate("/user/signin"));
    } else {
      this[this.action]();
    }
  }

  index() {
    alert("Hi");
  }

  account() {
    this._template = html`
      ${
        until(
          import("../user/PageAccount").then(({ default: template }) =>
            template()
          )
        )
      }
    `;
    this.requestUpdate();
  }

  posts() {
    console.log(this.tail);
    console.log("hi");
    const model = [
      {
        label: "Author",
        name: "author",
        type: "text"
      },
      {
        label: "Title",
        link: true,
        name: "title",
        type: "text"
      }
    ];
    import("../components/CollectionGrid/CollectionGrid");
    const userId = this.state.user.uid;
    this.getUser().then((user: any) => {
      if (user) {
        this._template = html`
          <collection-grid
            .model="${model}"
            .route="${this.tail}"
            .path="${`/users/${userId}/posts`}"
          ></collection-grid>
        `;
        this.requestUpdate();
        return;
        this.getCollection({
          path: `/users/${userId}/posts`,
          callback: (collection: any) => {
            this._template = html`
              <collection-grid
                .path="${`/users/${userId}/posts`}"
              ></collection-grid>
            `;
            this.requestUpdate();
          },
          watch: true
        });
      }
    });
  }

  signin() {
    this._template = html`
      <app-user></app-user>
    `;
    this.requestUpdate();
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

  theme() {
    this._template = html`
      <app-theme></app-theme>
    `;
    this.requestUpdate();
  }

  render() {
    return html`
      <style>
        :host {
          flex: 1;
        }
      </style>
      ${this._template}
    `;
  }
}

window.customElements.define("user-controller", UserController);

import { LitElement, html, property } from "lit-element";

import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { Mixin } from "../../packages/Mixin";
import { StateMixin } from "../../packages/StateMixin";
import { config } from "../../config";
import { connect } from "pwa-helpers/connect-mixin.js";
import { navigate } from "../Router";
import { signOut } from "../User";
import { store } from "../Store";
import structure from "../post/PostModel";
import { until } from "lit-html/directives/until";

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
      // signedIn
      //   ? store.dispatch(navigate("/user/account"))
      //   : store.dispatch(navigate("/user/signin"));
    } else {
      this[this.action](this.id);
    }
  }

  index() {
    alert("Hi");
  }

  account() {
    this._template = html`
      ${until(
        import("../user/PageAccount").then(({ default: template }) =>
          template()
        )
      )}
    `;
    this.requestUpdate();
  }

  post() {
    this.posts();
  }

  posts() {
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
    let route: string;
    this.getUser().then((user: any) => {
      if (user) {
        if (this.tail) {
          route = `${this.tail}/${this.id}`;
        }
        this._template = html`
          <collection-grid
            .model="${model}"
            .route="${route}"
            .path="${`/users/${userId}/posts`}"
          ></collection-grid>
        `;
        this.requestUpdate();
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
    // const user = new User();
    // user.signOut();
    signOut();
    this.setState({}, "user", { merge: false });
    this.setState(config.defaultTheme, "theme");
    navigate("/");
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

import { LitElement, html, property } from "lit-element";

import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import { Mixin } from "../../../packages/Mixin";
import { StateMixin } from "../../../packages/StateMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { navigate } from "../../Router";
import { signOut } from "../../User";
import { store } from "../../Store";
import { until } from "lit-html/directives/until";

import("..//User/Component");

export interface UserController {
  [key: string]: any; // Add index signature
}

export class UserController extends Mixin(connect(store)(LitElement), [
  FirebaseMixin,
  StateMixin
]) {
  @property({ type: String }) public action: string = "index";
  @property({ type: Object }) public data: any;
  @property({ type: String }) public tail: any;
  public _template: any;

  public connectedCallback() {
    super.connectedCallback();
    this.setStore(store);
  }

  public firstUpdated() {
    if (super.firstUpdated) {
      super.firstUpdated();
    }

    if (this.action === "index") {
      return;
    } else {
      this[this.action](this.id);
    }
  }

  public index() {
    return;
  }

  public account() {
    this._template = html`
      ${until(
        import("./PageAccount").then(({ default: template }) => template())
      )}
    `;
    this.requestUpdate();
  }

  public post() {
    this.posts();
  }

  public posts() {
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
    import("../CollectionGrid/CollectionGrid");
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

  public signin() {
    this._template = html`
      <user-component></user-component>
    `;
    this.requestUpdate();
  }

  public signout() {
    // const user = new User();
    // user.signOut();
    signOut();
    this.setState({}, "user", { merge: false });
    // this.setState(config.defaultTheme, "theme");
    navigate("/");
  }

  public theme() {
    this._template = html`
      <app-theme></app-theme>
    `;
    this.requestUpdate();
  }

  public render() {
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

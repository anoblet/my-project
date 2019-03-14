import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { firebase } from "../../Firebase";
import { user } from "../../User";

@customElement("contacts-component")
export class Contacts extends LitElement {
  @property() data = [];

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  async beforeRender() {
    // firebase.getDocument({ path: `` });
  }

  public in() {
    const _user = user.get().uid;
    firebase.update({
      path: `users/${_user}/contacts/timesheet`,
      data: this.data
    });
  }

  public out() {}
}

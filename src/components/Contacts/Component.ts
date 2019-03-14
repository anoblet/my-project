import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { firebase } from "../../Firebase";
import { user } from "../../User";

@customElement("contacts-component")
export class Contacts extends LitElement {
  @property() timesheet = { data: [] };

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  async beforeRender() {
    const _user = user.get().uid;
    firebase.getDocument({
      path: `users/${_user}/contacts/timesheet`,
      callback: document => (this.timesheet = document),
      watch: true
    });
  }

  public in() {
    this.timesheet.data.push()
    const _user = user.get().uid;
    firebase.update({
      path: `users/${_user}/contacts/timesheet`,
      data: this.timesheet
    });
  }

  public out() {}
}
